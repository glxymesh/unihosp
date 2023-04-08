import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PatientService {

  private logger = new Logger(PatientService.name);

  constructor(private prismaService: PrismaService) {
    this.logger.debug(`Initialized`);
  }

  createPatientProfile(handle: string, ownerId: string) {
    return this.prismaService.patient.create({
      data: {
        handle: `@${handle}`,
        owner: {
          connect: {
            id: ownerId
          }
        }
      }
    })
  }


  findPatientProfile(data: { id?: string, handle?: string, userId: string }) {
    const include = {
      owner: true,
      allowedDoctors: true,
      allowedHospitals: true
    }
    return this.prismaService.patient.findUnique({
      where: {
        id: data.id,
        handle: data.handle,
        userId: data.userId
      },
      include
    })
  }

  findPatientProfiles(data: { handle?: string }) {
    return this.prismaService.patient.findMany({
      where: {
        handle: { contains: data.handle }
      }
    })
  }

  allowDoctorPatientProfile(handle: string, doctorId: string) {
    return this.prismaService.patient.update({
      where: {
        handle
      },
      data: {
        allowedDoctors: {
          connect: [{ id: doctorId }]
        }
      }
    })
  }

  allowHospitalPatientProfile(handle: string, hospitalId: string) {
    return this.prismaService.patient.update({
      where: {
        handle
      },
      data: {
        allowedHospitals: {
          connect: [
            {
              id: hospitalId
            }
          ]
        }
      }
    })
  }

  updatePatientProfile(input: Prisma.PatientWhereUniqueInput, data: Prisma.PatientUpdateInput) {
    return this.prismaService.patient.update({
      where: input,
      data: data
    })
  }

  deleteProfile(data: { handle?: string, id?: string }) {
    if (data.handle)
      return this.prismaService.patient.delete({
        where: {
          id: data.id
        }
      });
    else
      return this.prismaService.patient.delete({
        where: {
          handle: data.handle
        }
      });
  }
}
