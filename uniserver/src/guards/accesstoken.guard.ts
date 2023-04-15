import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Role, User } from '@prisma/client';
import { Observable } from 'rxjs';
import { AuthService } from 'src/authentication/services/auth.service';


@Injectable()
export class AccessTokenGuard implements CanActivate {

  private logger = new Logger(AccessTokenGuard.name);

  constructor(private reflector: Reflector, private authService: AuthService, private configService: ConfigService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.headers["x-api-key"] === this.configService.get('DEVELOPMENT_KEY'))
      return true
    else {
      this.logger.debug(`Validating`);
      console.log(request.headers['authorization'])
      const user = request.headers['authorization'] ? this.validate(request.headers['authorization']) : undefined;
      if (!user) return false;
      console.log(user);
      request.headers['user'] = user;
      return true
    }
  }

  private validate(authorization: string): User {
    const { user } = this.authService.verify(authorization);
    return user;
  }
}
