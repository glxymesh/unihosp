import { EmailMessageData } from "@elasticemail/elasticemail-client-ts-axios";
import { readFileSync } from "fs";


export function VerifyMail(
  recipient: string,
  userName: string,
  verificationURI: string,
  otpCode: number
): EmailMessageData {
  return {
    Recipients: [
      {
        Email: recipient,
      },

    ],
    Content: {
      Body: [
        {
          ContentType: 'HTML',
          Charset: 'utf-8',
          Content: readFileSync("/Users/abhishek/Developer/Development Project/backend_server/src/authentication/auth /templates/mail.template.html").toString()
        },
      ],
      Merge: {
        username: userName,
        verificationURI: `${verificationURI}`,
        otpCode: otpCode.toString()
      },
      From: `no-reply@unihosp.live`,
      Subject: `Verify Your Email Address`,
    },
  };
}
