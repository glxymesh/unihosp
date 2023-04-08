import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PatientGuard } from './guard/patient.guard';
import { PatientService } from './service/patient.service';

interface PatientDeleteInput {
  handle?: string,
  id?: string
}

interface AddToAllowedPatientUserInput {
  type: "Hospital" | "Doctor",
  patientHandle?: string,
  hospitalHandle?: string,
  doctorHandle?: string
}

@Controller('patient')
@UseGuards(PatientGuard)
export class PatientController {

  constructor(private readonly patient: PatientService) { }

  @Get()
  findPatient(@Body() data: Prisma.PatientWhereUniqueInput) {
    return this.patient.findPatientProfile({
      userId: data.userId,
      id: data.id,
      handle: data.handle
    })
  }

  @Get("/search")
  findAllPatient(@Body('query') query: string) {
    return this.patient.findPatientProfiles({
      handle: query
    });
  }

  @Post()
  createPatientProfile(@Body() data: { handle: string, userId: string }) {
    if (data.handle.startsWith("@")) data.handle = data.handle.slice(1, data.handle.length);
    return this.patient.createPatientProfile(data.handle, data.userId)
  }

  @Put()
  addToAllowedList(@Body() data: AddToAllowedPatientUserInput) {
    switch (data.type) {
      case 'Hospital':
        return this.patient.updatePatientProfile({
          handle: data.patientHandle,
        }, {
          allowedHospitals: {
            connect: {
              handle: data.hospitalHandle
            }
          }
        })
      case 'Doctor':
        return this.patient.updatePatientProfile({
          handle: data.patientHandle,
        }, {
          allowedHospitals: {
            connect: {
              handle: data.doctorHandle
            }
          }
        })
    }
  }

  @Delete()
  deletePatientProfile(@Body() data: PatientDeleteInput) {
    return this.patient.deleteProfile({
      id: data.id,
      handle: data.handle
    })
  }
}
