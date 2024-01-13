import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity. postgres';
import { AuthModule } from 'src/auth/modules/auth.module';
import { AuthGuard } from "../../auth/guards/admin/auth.guard";
import { AuthService } from 'src/auth/services/auth.service';



@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, AuthService],
  exports: [UsersService]
})
export class UsersModule {}