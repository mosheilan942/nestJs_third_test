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






@Module({
  imports: [

    // configuration
    ConfigModule.forRoot({isGlobal: true}),

    // caching
    CacheModule.registerAsync(RedisOptions),

    // postgres connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '3.14159',
      username: 'postgres',
      entities: [User],
      database: 'users',
      synchronize: true,
      logging: true,
    }),

    // mongodb connection
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),

    // graphql + apollo playground configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:'cars.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    // local modules
    UsersModule,
    AuthModule,
    CarsModule
  ],
  controllers: [UsersController, AppController, CarsController],
  providers: [AppService],
})
export class AppModule {}
