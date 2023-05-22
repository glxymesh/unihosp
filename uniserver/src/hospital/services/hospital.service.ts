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

  async createHandle(name: string, count = 0): Promise<string> {
    const splittedName = name.split(" ");
    const generated = "@" + splittedName.map(v => v.slice(-3 - count)).join("")
    const alreadyThere = await this.prismaService.hospital.findUnique({ where: { handle: generated } });
    if (alreadyThere) {
      return this.createHandle(name, - count);
    }
    return generated;
  }

  async createManyHospital(inputs: { name: string, handle?: string, location?: string }[]) {
    let data: { name: string, handle: string, location?: string }[] = [];
    for (const input of inputs) {
      let handle = "";
      if (!input.handle) {
        handle = await this.createHandle(input.name);
      }
      data.push({ ...input, handle });
    }
    return this.prismaService.hospital.createMany({
      data,
      skipDuplicates: true
    }).catch((err) => ({
      message: err.message
    }));
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
