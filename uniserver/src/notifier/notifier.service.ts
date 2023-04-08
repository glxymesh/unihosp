import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class NotifierService {

  private readonly logger = new Logger(NotifierService.name);

  constructor(private prismaService: PrismaService) { }

  createNotification() { }

}
