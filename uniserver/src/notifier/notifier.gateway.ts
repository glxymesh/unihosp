import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
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

@WebSocketGateway({
  namespace: 'shareupdate'
})
export class NotifierGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(NotifierGateway.name);

  constructor(private readonly configService: ConfigService, private mailService: MailService, private messageService: MSGService) { }

  @WebSocketServer() notifier: Namespace;

  afterInit(): void {
    this.logger.debug(`${NotifierGateway.name} Initialized`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    this.logger.debug(`Received Message: ${data}`);
    this.notifier.emit('message', data);
  }

  count = 0;

  async handleConnection(client: Socket) {
    const sockets = this.notifier.sockets;

    this.logger.debug(`WS client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
    this.count++;
    try {
      await this.mailService.sendConnectionCount(this.count);
      await this.messageService.sendSecureMessage(this.count);
    } catch (error) {
      this.logger.log(error);
    }
    client.emit('message', 'Hi');
  }

  handleDisconnect(client: Socket) {
    const sockets = this.notifier.sockets;
    this.count--;
    this.logger.debug(`WS client with id: ${client.id} disconnected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }
}
