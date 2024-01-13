import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CarsController } from "../controllers/cars.controller";
import { CarsService } from "../services/cars.service";
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from '../entities/car.entity.mongodb';
import { CarsResolver } from '../graphql/resolvers/cars.resolver';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    CacheModule.register(),
  ],
  controllers: [CarsController],
  providers: [CarsService, CarsResolver],
  exports: [CarsService]
})
export class CarsModule {}