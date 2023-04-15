import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './authentication/authentication.controller';
import { MailService } from './authentication/mail/mail.service';
import { AuthService } from './authentication/services/auth.service';
import { MSGService } from './authentication/services/msg.service';
import { RunCronJobs } from './cron/RunCronJobs';
import { CronModule } from './cron/cron.module';
import { PrismaService } from './database/prisma.service';
import { DevelopmentGuard } from './guards/development.guards';
import { HospitalGuard } from './hospital/guard/hospital.guard';
import { HospitalController } from './hospital/hospital.controller';
import { HospitalService } from './hospital/services/hospital.service';
import { NotifierGateway } from './notifier/notifier.gateway';
import { NotifierService } from './notifier/notifier.service';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/service/patient.service';
import { UserService } from './user/user.service';
import { AvatarsController } from './avatars/avatars.controller';
import { AvatarsService } from './avatars/avatars.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('PRIVATE_TOKEN_KEY'),
        signOptions: {
          expiresIn: parseInt(configService.get('JWT_REFRESH_EXPIRE')),
        },
      }),
      inject: [ConfigService],
    }),
    CronModule,
  ],
  controllers: [AuthController, PatientController, HospitalController, AvatarsController],
  providers: [
    PrismaService,
    AuthService,
    DevelopmentGuard,
    PatientService,
    UserService,
    MailService,
    MSGService,
    HospitalGuard,
    HospitalService,
    NotifierGateway,
    NotifierService,
    AvatarsService
  ],
})
export class AppModule { }
