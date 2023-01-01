import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MESSAGE } from '@/consts/message';

@Injectable()
export class RolesGuard {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: MESSAGE.haventAuth})
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: MESSAGE.haventAuth})
    }
  }
}
