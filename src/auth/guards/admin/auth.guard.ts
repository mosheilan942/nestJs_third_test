import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from '../../services/auth.service';

const chalk = require('chalk');

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization.trim()) {
        throw new UnauthorizedException('Please provide token');
      }
      console.log('authorization', authorization);

      const authToken = authorization.replace(/bearer/gim, '').trim();

      console.log('authToken', authToken);

      const resp = await this.authService.validateToken(authToken);
      request.decodedData = resp;
      return true;
    } catch (error) {
      console.log(chalk.red('auth error - ', error.message));
      return false;
    }
  }
}
