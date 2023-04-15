import { INestApplication, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server, ServerOptions } from "socket.io";
import { SocketWithAuth } from "src/interfaces/socketWithAuth";

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name);

  jwtService: JwtService;

  constructor(private app: INestApplication) {
    super(app);
    this.jwtService = app.get(JwtService);
    this.authentication = this.authentication.bind(this);
  }

  authentication = (socket: SocketWithAuth, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers['token'];
    this.logger.debug(token);

    try {
      const payload = this.jwtService.verify(token);
      this.logger.debug(payload);

      socket.userId = payload.id;
      socket.name = payload.name;

      next();
    } catch (err) {
      this.logger.error(err);
      next(new Error("FORBIDDEN"));
    }
  }


  createIOServer(port: number, options?: ServerOptions) {
    this.logger.debug('Configuring SocketIO Server');

    options = {
      ...options,
      cors: {
        origin: [
          `http://localhost:3000`,
          `http://127.0.0.1:3000`,
          `http://localhost:4200`,
          `http://127.0.0.1:4200`,
          `http://localhost:5500`,
          `http://127.0.0.1:5500`,
          'http://192.168.56.249:4200/',
          'https://unihosp.live'
        ]
      }
    };
    const io: Server = super.createIOServer(port, options);
    io.of("/notifier").use(this.authentication);
    return io;
  }


}