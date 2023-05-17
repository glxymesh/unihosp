import { Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Namespace, Socket } from 'socket.io';
import { MailService } from 'src/authentication/mail/mail.service';
import { MSGService } from 'src/authentication/services/msg.service';
import { AppAccessGuard } from 'src/guards/app-access.guard';
import { LogToDbService } from 'src/log-to-db/log-to-db.service';

@WebSocketGateway({
  namespace: /\w*/,
})
export class NotifierGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(NotifierGateway.name);

  constructor(
    private readonly configService: ConfigService,
    private mailService: MailService,
    private messageService: MSGService,
    private loggerService: LogToDbService
  ) {
    this.sendNotification = this.sendNotification.bind(this);
  }

  @WebSocketServer() notifier: Namespace;

  afterInit(): void {
    this.logger.debug(`${NotifierGateway.name} Initialized`);
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: string) {
    this.logger.debug(`Received Message: ${data}`);
    client.broadcast.emit('message', data);
  }

  count = 0;

  async sendNotification() {
    await this.loggerService.log('Set timeout called: Sending Notification')
    this.logger.debug('Set timeout called: Sending Notification')
    // await this.mailService.sendConnectionCount(this.count);
  }


  @SubscribeMessage("user-room")
  handleRoomJoining(client: Socket, data: string, room: string) {
    console.log(client.rooms);

    client.join(data);
    client.to(data).emit("message", `Greetings, I am ${client.id}`)
  }

  async handleConnection(client: Socket) {
    const sockets = this.notifier.sockets;

    this.logger.debug(`WS client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
    this.count++;
    this.logger.debug(`Notifier Name: ${this.notifier.name}`);
    try {
      await this.sendNotification();
      await this.loggerService.log(`WS client with id: ${client.id} connected!`);
    } catch (error) {
      this.logger.log(error);
    }
    client.broadcast.emit('message', 'Hi');
  }

  async handleDisconnect(client: Socket) {
    const sockets = this.notifier.sockets;
    this.count--;
    try {
      await this.loggerService.log(`WS client with id: ${client.id} connected!`);
    } catch (err) {
      await this.loggerService.log(JSON.stringify(err)).catch(this.logger.log);
      this.logger.log(JSON.stringify(err));
    }
    this.logger.debug(`WS client with id: ${client.id} disconnected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }
}
