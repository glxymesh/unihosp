import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LogToDbService {

  constructor(private prismaService: PrismaService) { }

  log(description: string) {
    return this.prismaService.logs.create({
      data: {
        description
      }
    })
  }
}
