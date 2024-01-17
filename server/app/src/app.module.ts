import { Module } from '@nestjs/common';
import { UsersModule } from './users/modules/users.module';
import { CacheModule, CacheManagerOptions } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/controllers/users.controller';
import { CarsController } from './cars/controllers/cars.controller';
import { User } from './users/entities/user.entity. postgres';
import { AuthModule } from './auth/modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisOptions } from './configs/app-options-redis.constants';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { CarsResolver } from './cars/graphql/resolvers/cars.resolver';
import { CarsModule } from './cars/modules/cars.module';
import 'dotenv/config';
import * as chalk from 'chalk';

export const errorColor = chalk.bold.red;
export const warningColor = chalk.hex('#FFA500');
export const successColor = chalk.greenBright;

@Module({
  imports: [
    // configuration
    ConfigModule.forRoot({ isGlobal: true }),

    // caching
    CacheModule.registerAsync(RedisOptions),

    // postgres connection
    TypeOrmModule.forRoot({
      entities: [User],
      type: 'postgres',
      synchronize: true,
      url: process.env.CONNECTION_STRING_POSTGRES,
    }),

    // mongodb connection
    MongooseModule.forRoot(process.env.CONNECTION_STRING_MONGODB),

    // graphql + apollo playground configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'cars.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    // local modules
    UsersModule,
    AuthModule,
    CarsModule,
  ],
  controllers: [UsersController, AppController, CarsController],
  providers: [AppService],
})
export class AppModule {}
