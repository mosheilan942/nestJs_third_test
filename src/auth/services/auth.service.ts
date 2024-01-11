import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_KEY } from "../../main";
import { comparePassword } from 'src/users/utils/hash';


const JWT_ACCESS_SECRET = "Ab3o7fU1Jfj4DaIDRuMvm6k8YU//00cqTJAocAstp5PBKQtzEUVRQCqhRwmay9dwh7MHz+kcT/RPpyc/mReSKHAa8J7TSniG7Bkze53Zys1FdtLuSRnzuCKKBv4REEaE6Fn7h/p59QQezE77C9ZdwKZvCyxtgZqFMJJSYXCYmpaKzZsZRerRcrIMky1p6oa8ZGL/bVOSRdgGI6dOO73q1rxXML2QZVBHn/RhOj9Oo4EXYxRF7jCg+yd5diD/vr42CVAaN1M9VWrmiIGzdeaAv8ojbZqWnBAmGBhR7Drza5dequ/r4r0ID6JmUQZtsKmKSZp5VqRfalDWYqKLUO6zHA=="


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly jwtServ: JwtService,
    private usersService: UsersService,
  ) { }

  async signIn(username:string, password:string) {
    const user = await this.usersService.findByUsername(username);
    const compare = await comparePassword(password, user.password)
    // console.log("compare", compare, "user", user);
    
    if (user && compare) {
      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload)
      } 
    }
    throw new UnauthorizedException();
  }

  validateToken(token: string) {
    return this.jwtServ.verify(token, {
      secret: process.env.JWT_SECRET_KEY
    });
  }
}