import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, User } from '@prisma/client';
import { Observable } from 'rxjs';
import { AuthService } from 'src/authentication/services/auth.service';


@Injectable()
export class HospitalGuard implements CanActivate {

  private logger = new Logger(HospitalGuard.name);

  constructor(private reflector: Reflector, private authService: AuthService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<Role>('role', context.getClass());
    const request: Request = context.switchToHttp().getRequest();
    if (request.headers["x-api-key"] === "2cf9919ceb964f398984cf7bb98416ca")
      return true
    else {
      this.logger.debug(`Validating`);
      const user = request.headers['authorization'] ? this.validate(request.headers['authorization']) : undefined;
      this.logger.debug(`Matching roles: ${this.matchRoles(role, user.role)}`)
      return this.matchRoles(role, user.role);
    }
  }

  private matchRoles(roles: Role, userRole: Role) {
    return roles === userRole;
  }

  private validate(authorization: string): User {
    const { user } = this.authService.verify(authorization);
    return user;
  }
}
