import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { errorColor } from "../../../app.module";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      if (!authorization.trim()) {
        throw new UnauthorizedException('Please provide token');
      }

      const authToken = authorization.replace(/bearer/gim, '').trim();

      const resp = this.authService.validateToken(authToken);
      request.decodedData = resp;
      return true;
    } catch (error) {
      console.log(errorColor('auth error - ', error.message));
      return false;
    }
  }
}
