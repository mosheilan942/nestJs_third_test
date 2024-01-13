import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_KEY } from '../../main';
import { comparePassword } from 'src/users/utils/hash';

const JWT_ACCESS_SECRET =
  'Ab3o7fU1Jfj4DaIDRuMvm6k8YU//00cqTJAocAstp5PBKQtzEUVRQCqhRwmay9dwh7MHz+kcT/RPpyc/mReSKHAa8J7TSniG7Bkze53Zys1FdtLuSRnzuCKKBv4REEaE6Fn7h/p59QQezE77C9ZdwKZvCyxtgZqFMJJSYXCYmpaKzZsZRerRcrIMky1p6oa8ZGL/bVOSRdgGI6dOO73q1rxXML2QZVBHn/RhOj9Oo4EXYxRF7jCg+yd5diD/vr42CVAaN1M9VWrmiIGzdeaAv8ojbZqWnBAmGBhR7Drza5dequ/r4r0ID6JmUQZtsKmKSZp5VqRfalDWYqKLUO6zHA==';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly jwtServ: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(email: string, passwordFromClient: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User authentication error');

    const compare = await comparePassword(passwordFromClient, user.password);
    if (!compare) throw new BadRequestException('User authentication error');

    const payload = { sub: user.id, username: user.username };
    const access_token = {
      access_token: await this.jwtService.signAsync(payload),
    };
    return access_token;
  }

  validateToken(token: string) {
    return this.jwtServ.verify(token);
  }
}
