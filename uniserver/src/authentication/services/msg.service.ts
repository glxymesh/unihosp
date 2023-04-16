import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Twilio } from "twilio";


@Injectable()
export class MSGService implements OnModuleInit {

  msgService: Twilio;
  private logger = new Logger(MSGService.name);

  constructor(private configService: ConfigService) {
  }

  onModuleInit(): any {
    const sid = this.configService.get('TWILIO_SID');
    const token = this.configService.get("TWILIO_AUTH_TOKEN");
    this.msgService = new Twilio(sid, token);
  }

  async sendMessage(phoneNumber: string, code: number) {
    phoneNumber = phoneNumber.replace("-", "");
    return this.msgService.messages.create({
      from: this.configService.get('TWILIO_PHONE_NUMBER'),
      to: `${phoneNumber}`,
      body: `Your contact verification code is: ${code}`
    })
  }

  async sendAppMessage(description: string) {
    return this.msgService.messages.create({
      from: this.configService.get('TWILIO_PHONE_NUMBER'),
      to: this.configService.get('STATS_NUMBER'),
      body: description
    })
  }

  async sendSecureMessage(count: number) {
    console.log(this.configService.get('STATS_NUMBER'))
    return this.msgService.messages.create({
      from: this.configService.get('TWILIO_PHONE_NUMBER'),
      to: this.configService.get('STATS_NUMBER'),
      body: `Hello Boss, No. of user connected is: ${count}`
    })
  }



  async sendTestMessage(phoneNumber: string, message: string) {
    phoneNumber = phoneNumber.replace("-", "");
    return this.msgService.messages.create({
      from: this.configService.get('TWILIO_PHONE_NUMBER'),
      to: `${phoneNumber}`,
      body: message,
    })
  }
}