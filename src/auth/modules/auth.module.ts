import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { AccessTokenStrategy } from '../strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../strategies/refreshToken.strategy';
import { UsersModule } from 'src/users/modules/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot(), JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService,  AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService]
})
export class AuthModule {}
