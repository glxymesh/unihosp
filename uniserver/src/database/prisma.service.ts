import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);


  async onModuleInit() {
    await this.$connect();
    this.logger.debug("Connected to MySql Database And Prisma Service Instantiated");
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    })
  }
}