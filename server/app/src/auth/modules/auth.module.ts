import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { UsersModule } from '../../users/modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controllers';
import { JWT_KEY } from "../../main";
import { AuthGuard } from "../guards/token/auth.guard";
const JWT_ACCESS_SECRET = "Ab3o7fU1Jfj4DaIDRuMvm6k8YU//00cqTJAocAstp5PBKQtzEUVRQCqhRwmay9dwh7MHz+kcT/RPpyc/mReSKHAa8J7TSniG7Bkze53Zys1FdtLuSRnzuCKKBv4REEaE6Fn7h/p59QQezE77C9ZdwKZvCyxtgZqFMJJSYXCYmpaKzZsZRerRcrIMky1p6oa8ZGL/bVOSRdgGI6dOO73q1rxXML2QZVBHn/RhOj9Oo4EXYxRF7jCg+yd5diD/vr42CVAaN1M9VWrmiIGzdeaAv8ojbZqWnBAmGBhR7Drza5dequ/r4r0ID6JmUQZtsKmKSZp5VqRfalDWYqKLUO6zHA=="


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}