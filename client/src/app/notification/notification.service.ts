import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class NotificationService {

  io: Socket;

  constructor() {
    this.io = io("http://localhost:3000/notifier", {
      extraHeaders: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA3MjJjYzEwLTc2MzMtNGFkYS1iYjJjLTExZmY1MmViYjRhOCIsImVtYWlsIjoiYWJoaXNoZWsubWF1cnlhQHNhZ2V1bml2ZXJzaXR5LmluIiwicGFzc3dvcmQiOiJmMDZhM2I4YzQzOTA3M2RkMzQxNGUwYjYwYTc5NzVkZjBiYTI2MGRiMmNkZDYzNzM5ODcxNmRmM2E1YzljZWM2IiwibmFtZSI6bnVsbCwiY29udGFjdCI6Iis5MS05MDM5NTE1OTM2Iiwicm9sZSI6IlBhdGllbnQiLCJjcmVhdGVkQXQiOiIyMDIzLTA0LTA5VDE4OjAzOjI1LjU5M1oiLCJ1cGRhdGVkQXQiOm51bGwsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNjgxMDcwOTMwLCJleHAiOjE2ODEwNzgxMzB9.J2-QJbqKqpK92Segr3E70bpOrCBy15gPlhepFjtqyPw"
      }
    });
  }

  listen() {
    return new Observable((subscribe) => {
      this.io.on("message", (message) => {
        subscribe.next(message);
      })
    })
  }

  readHi() {

  }

  sendMessage(message: string) {
    this.io.emit("message", message);
  }
}