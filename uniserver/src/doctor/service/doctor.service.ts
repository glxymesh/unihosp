import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DoctorService {

  logger = new Logger(DoctorService.name);

  constructor(private prismaService: PrismaService) { }

  addDoctor() {

  }

}
