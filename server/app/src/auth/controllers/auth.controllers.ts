import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { errorColor } from '../../app.module';
import { successColor } from '../../app.module';
import { warningColor } from '../../app.module';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    if (signInDto.email && signInDto.password) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
    throw new UnauthorizedException('Both email and password are required');
  }
}
