import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/users/utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly jwtServ: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(email: string, passwordFromClient: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User authentication error');

    const compare = await comparePassword(passwordFromClient, user.password);
    if (!compare) throw new UnauthorizedException('User authentication error');

    const payload = { sub: user.id, username: user.username, role: user.role };
    const access_token = {
      access_token: await this.jwtService.signAsync(payload),
    };
    return access_token;
  }

  validateToken(token: string) {
    return this.jwtServ.verify(token);
  }
}
