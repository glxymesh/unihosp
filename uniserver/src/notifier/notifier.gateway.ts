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

@WebSocketGateway({
  namespace: 'notifier',
})
export class NotifierGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(NotifierGateway.name);

  constructor(private readonly configService: ConfigService) { }

  @WebSocketServer() notifier: Namespace;

  afterInit(): void {
    this.logger.debug(`${NotifierGateway.name} Initialized`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    this.logger.debug(`Received Message: ${data}`);
    this.notifier.emit('message', data);
  }

  handleConnection(client: Socket) {
    const sockets = this.notifier.sockets;

    this.logger.debug(`WS client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    client.emit('message', this.configService.get('REDIS_HOST'));
  }

  handleDisconnect(client: Socket) {
    const sockets = this.notifier.sockets;
    this.logger.debug(`WS client with id: ${client.id} disconnected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }
}
