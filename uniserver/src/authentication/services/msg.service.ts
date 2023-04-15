import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Twilio } from "twilio";


@Injectable()
export class MSGService implements OnModuleInit {

  msgService: Twilio;

  constructor(private configService: ConfigService) {
  }

  onModuleInit(): any {
    this.msgService = new Twilio(this.configService.get('TWILIO_SID'), this.configService.get("TWILIO_AUTH_TOKEN"));
  }

  async sendMessage(phoneNumber: string, code: number) {
    phoneNumber = phoneNumber.replace("-", "");
    return this.msgService.messages.create({
      from: this.configService.get('TWILIO_PHONE_NUMBER'),
      to: `${phoneNumber}`,
      body: `Your contact verification code is: ${code}`
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