import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Logger,
  Post,
  Query,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { DevelopmentGuard } from 'src/guards/development.guards';
import { PatientService } from 'src/patient/service/patient.service';
import { UserService } from 'src/user/user.service';
import { MailService } from './mail/mail.service';
import { AuthService } from './services/auth.service';
import { MSGService } from './services/msg.service';

enum ToCheckType {
  Email,
  Handle,
}
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private mailService: MailService,
    private msgService: MSGService,
    private patientService: PatientService,
  ) { }

  private logger = new Logger(AuthController.name);

  @Post('users')
  getAllUsers(@Body() data: any) {
    return this.userService.users({ ...data });
  }

  @Post('exists')
  async doesExists(@Body() data: { handle?: string; email?: string }) {
    const { handle, email } = data;

    const toCheck = email
      ? ToCheckType.Email
      : data.handle
        ? ToCheckType.Handle
        : null;
    console.log(toCheck);
    let response: any;

    switch (toCheck) {
      case ToCheckType.Email:
        if (await this.userService.user({ email })) {
          this.logger.log(this.userService.user({ email }));
          response = {
            email: true,
          };
        }
        break;
      case ToCheckType.Handle:
        if (this.patientService.findPatientProfiles({ handle }) != null)
          response = {
            handle: true,
          };
        break;
      default:
        return {
          error: '401',
          email: false,
          handle: false,
        };
    }

    return response ? response : {
      error: '401',
      email: false,
      handle: false,
    };
  }

  @Post('signup')
  async signup(
    @Body()
    signUpData: {
      email: string;
      password: string;
      contact: string;
      role?: Role;
    },
  ) {
    this.logger.debug(`Signing Up: ${JSON.stringify(signUpData)}`);

    if (!/^(\+\d{1,2})-(\d{10})$/.test(signUpData.contact)) {
      return {
        statusCode: 403,
        message: 'Wrong Contact details',
      };
    }

    const id = await this.userService.verifyMailAndContact(
      signUpData.email,
      signUpData.contact,
    );
    const response = await this.mailService.sendMail(
      signUpData.email,
      signUpData.email,
      id.uri,
      id.code,
    );

    if (signUpData.contact) {
      const message = await this.msgService.sendMessage(
        signUpData.contact,
        id.code,
      );
      this.logger.debug(`MessageSent: ${JSON.stringify(message)}`);
    }

    this.logger.debug(`MailSent: ${JSON.stringify(response)}`);

    return this.authService.signup(signUpData);
  }

  @Post('verify')
  @Redirect()
  async verifyCode(
    @Body() vData: { email: string; contact: string; otpCode: number },
  ) {
    try {
      if (/^(\+\d{1,2})-(\d{10})$/.test(vData.contact)) {
        return {
          statusCode: 403,
          message: 'Wrong Contact details',
        };
      }

      const data = await this.userService.getAndDeleteVerifyMailByEmail(
        vData.email,
        vData.contact,
      );

      if (data.code !== vData.otpCode) {
        return {
          statusCode: 403,
          message: "OTP doesn't match",
        };
      }

      const update = await this.userService.updateUser({
        where: {
          email: data.email,
        },
        data: {
          verified: true,
          updatedAt: new Date(),
        },
      });

      this.logger.debug(
        `Mail ${data.email}  is Verified With Code: ${data.id}`,
      );
      this.logger.debug(`Email Verified: ${update.email} = ${update.verified}`);

      return {
        uri: 'http://localhost:4200',
      };
    } catch (err) {
      return err;
    }
  }

  @Get('verify')
  @Redirect()
  async verifyMail(
    @Query('redirectURL') redirectURI: string,
    @Query('vc') verifyCode: string,
  ) {
    this.logger.debug('Verifying Mail');
    try {
      const mail = await this.userService.getAndDeleteVerifyMailById(
        verifyCode,
      );
      const update = await this.userService.updateUser({
        where: {
          email: mail.email,
        },
        data: {
          verified: true,
          updatedAt: new Date(),
        },
      });
      this.logger.debug(`Mail ${mail.email} is Verified With Code: ${mail.id}`);
      this.logger.debug(`Email Verified: ${update.email} = ${update.verified}`);
      return {
        url: redirectURI,
      };
    } catch (e) {
      return e;
    }
  }

  @Post('msg')
  @UseGuards(DevelopmentGuard)
  sendTestMessage(@Body() data: { phoneNumber: string; message: string }) {
    return this.msgService.sendTestMessage(data.phoneNumber, data.message);
  }

  @Post('login')
  login(@Body() data: { email: string; password: string }) {
    console.log(data);
    if (!/\w*@\w*.\w*/.test(data.email))
      return {
        statusCode: 406,
        message: 'Please provide correct email Address',
      };
    return this.authService.login(data);
  }

  @Post('accesstoken')
  getAccessToken(
    @Headers('RefreshToken') authorization: string,
    @Body('userId') userId: string,
  ) {
    this.logger.debug(`RefreshToken: ${authorization}`);
    try {
      return this.authService.generateFromToken(authorization);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Post('verify')
  checkLoggedInStatus() { }

  @Delete('logout')
  deleteRefreshToken(@Body('refreshTokenId') refreshTokenId: string) {
    return this.authService.deleteRefreshToken(refreshTokenId);
  }
}
