import { Module } from '@nestjs/common';
import { UsersModule } from './users/modules/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/controllers/users.controller';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/modules/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '3.14159',
      username: 'admin',
      entities: [User],
      database: 'users',
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
