import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RunCronJobs } from './RunCronJobs';

@Module({
  providers: [RunCronJobs, PrismaService]
})
export class CronModule { }
