import { Body, Controller, Delete, Get, Headers, Post, Put, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AuthService } from 'src/authentication/services/auth.service';
import { AccessTokenGuard } from 'src/guards/accesstoken.guard';
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
@UseGuards(AccessTokenGuard)
@UseGuards(PatientGuard)
export class PatientController {

  constructor(private readonly patientService: PatientService, private authService: AuthService) { }

  @Get()
  findPatient(@Body() data: Prisma.PatientWhereUniqueInput) {
    return this.patientService.findPatientProfile({
      userId: data.userId,
      id: data.id,
      handle: data.handle
    })
  }

  @Get('/user')
  async getPatientByUserID(@Headers('user') user: User) {
    return this.patientService.findPatientProfile({
      userId: user.id
    })
  }

  @Get("/search")
  findAllPatient(@Body('query') query: string) {
    return this.patientService.findPatientProfiles({
      handle: query
    });
  }

  @Post('exists')
  exists(@Body() data: { handle: string }) {
    return this.patientService.exists(data.handle);
  }

  @Post()
  createPatientProfile(@Headers('user') user: User, @Body() data: Prisma.PatientCreateInput) {
    console.log(user)
    return this.patientService.createPatientProfile({ ...data, ownerId: user.id });
  }

  @Put()
  addToAllowedList(@Body() data: AddToAllowedPatientUserInput) {
    switch (data.type) {
      case 'Hospital':
        return this.patientService.updatePatientProfile({
          handle: data.patientHandle,
        }, {
          allowedHospitals: {
            connect: {
              handle: data.hospitalHandle
            }
          }
        })
      case 'Doctor':
        return this.patientService.updatePatientProfile({
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
    return this.patientService.deleteProfile({
      id: data.id,
      handle: data.handle
    })
  }
}
