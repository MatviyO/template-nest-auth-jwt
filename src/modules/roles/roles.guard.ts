import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MESSAGE } from '@/consts/message';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@/modules/roles/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
      if (!requireRoles) {
        return true;
      };

      const req = context.switchToHttp().getRequest()
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: MESSAGE.haventAuth})
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some(role => requireRoles.includes(role.value));
    } catch (e) {
      throw new HttpException({ message: MESSAGE.haventAccess}, HttpStatus.FORBIDDEN)
    }
  }
}
