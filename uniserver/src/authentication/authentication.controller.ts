import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  Logger,
  Param,
  Post,
  Query,
  Redirect,
  UseGuards,
} from '@nestjs/common';

import { Role, User } from '@prisma/client';
import { AccessTokenGuard } from 'src/guards/accesstoken.guard';
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

  @Get('user')
  @UseGuards(AccessTokenGuard)
  getCurrentUser(@Headers('user') user: User) {
    return this.userService.user({
      id: user.id,
    }, {
      patient: true
    });
  }

  @Post('exists')
  async doesExists(@Body() data: { email?: string }) {
    const { email } = data;

    const toCheck = email
      ? ToCheckType.Email
      : null;
    let response: any;

    switch (toCheck) {
      case ToCheckType.Email:
        if (await this.userService.user({ email })) {
          console.log(await this.userService.user({ email }));
          response = {
            email: true,
          };
        }
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
    return this.authService.signup(signUpData);
  }


  @Post('v/:id')
  @Redirect()
  async verifyCode(
    @Param('id') id: string,
    @Body() vData: { otpCode: number },
  ) {
    this.logger.debug('Verifying OTP');
    try {
      const mail = await this.userService.getAndDeleteVerifyMailById(id);

      if (mail.code !== vData.otpCode) {
        return {
          statusCode: 403,
          message: "OTP doesn't match",
        };
      }

      const update = await this.userService.updateUser({
        where: {
          email: mail.email,
        },
        data: {
          verified: true,
          updatedAt: new Date(),
        },
      });


      this.logger.debug(
        `Mail ${mail.email}  is Verified With Code: ${mail.id}`,
      );
      this.logger.debug(`Email Verified using OTP: ${update.email} = ${update.verified}`);

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

  @Post("testmail")
  sendTestMail(@Body() data: { recepient: string; username: string }) {
    return this.mailService.sendMail(data.recepient, data.username, "Unknown", 123423);
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
    @Headers('refreshToken') authorization: string,
  ) {
    this.logger.debug(`RefreshToken: ${authorization}`);
    try {
      return this.authService.generateFromToken(authorization);
    } catch (err) {
      this.logger.error(err);
    }
  }

  // @Post('verify')
  // checkLoggedInStatus() {

  // }

  @Delete('logout')
  deleteRefreshToken(@Body('refreshTokenId') refreshTokenId: string) {
    console.log(refreshTokenId);
    return this.authService.deleteRefreshToken(refreshTokenId);
  }
}
