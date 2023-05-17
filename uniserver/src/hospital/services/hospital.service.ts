import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class HospitalService {

  logger = new Logger(HospitalService.name);

  constructor(private readonly prismaService: PrismaService) { }

  createOneHospital(input: Prisma.HospitalCreateInput) {
    return this.prismaService.hospital.create({
      data: input
    });
  }

  createManyHospital(input: Prisma.HospitalCreateManyInput) {
    return this.prismaService.hospital.createMany({
      data: input
    });
  }

  getHospitals(input: Prisma.HospitalWhereInput) {
    return this.prismaService.hospital.findMany({
      where: input
    })
  }

  getHospitalById(input: Prisma.HospitalWhereUniqueInput) {
    return this.prismaService.hospital.findUnique({
      where: { ...input },
      include: {
        doctor: true,
        allowedPatientProfiles: true,
        Appointments: true
      }
    })
  }

  updateHospital(where: Prisma.HospitalWhereUniqueInput, data: Prisma.HospitalUpdateInput) {
    return this.prismaService.hospital.update({
      where,
      data,
    })
  }

  deleteHospitalById(hospitalId: string) {
    return this.prismaService.hospital.delete({
      where: {
        id: hospitalId
      }
    })
  }

}
