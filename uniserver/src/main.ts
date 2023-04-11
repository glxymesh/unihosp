import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIOAdapter } from './notifier/socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://127.0.0.1:4200',
      'http://localhost:5500',
      'http://127.0.0.1:5500',
      'http://192.168.56.249:4200/'
    ]
  })

  // app.setGlobalPrefix("api/v1/");

  app.useWebSocketAdapter(new SocketIOAdapter(app));
  await app.listen(3000);
}
bootstrap();
