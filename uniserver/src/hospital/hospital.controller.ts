import { Body, Controller, Delete, Get, Logger, Post, Query, UseGuards } from '@nestjs/common';
import { HospitalGuard } from './guard/hospital.guard';
import Roles from './metadata/roles.metadata';
import { HospitalService } from './services/hospital.service';

@Roles('Admin')
@Controller('hospital')
@UseGuards(HospitalGuard)
export class HospitalController {

  private logger = new Logger(HospitalController.name);

  constructor(private hospitalService: HospitalService) { }

  @Get()
  getHospital(@Body() data: { id: string, handle: string }) {
    return this.hospitalService.getHospitalById({ id: data.id, handle: data.handle })
  }

  @Get("all")
  getHospitals(@Query("q") query?: string) {
    this.logger.debug(`Query: ${query}`);
    if (query)
      return this.hospitalService.getHospitals({
        OR: [
          {
            handle: { contains: query }
          },
          {
            name: { contains: query }
          },
          {
            location: { contains: query }
          }
        ]
      })
    else
      return this.hospitalService.getHospitals({});
  }

  private generateHandle(name: string): string {
    const splittedName = name.split(" ");
    let handle = "";
    for (const words of splittedName) {
      handle += words[0]
    }
    return "@" + handle.toLowerCase();
  }

  @Post()
  createHospital(@Body() data: { name: string, handle?: string }) {
    return this.hospitalService.createOneHospital({
      name: data.name,
      handle: data.handle || this.generateHandle(data.name)
    })
  }

  @Post()
  updateHospital() {

  }

  @Delete()
  deleteHospitalById(@Body('hospitalId') hospitalId: string) {
    return this.hospitalService.deleteHospitalById(hospitalId);
  }

}
