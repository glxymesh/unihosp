import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, User } from '@prisma/client';
import { Observable } from 'rxjs';
import { AuthService } from 'src/authentication/services/auth.service';


@Injectable()
export class PatientGuard implements CanActivate {


  private logger = new Logger(PatientGuard.name);

  constructor() { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true
  }

}
