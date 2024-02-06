import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { Car } from '../entities/car.entity.mongodb';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private readonly carModel: Model<Car>) {}

  async create(createCarDto: CreateCarDto): Promise<Car | void> {
    const car: Car = { ...createCarDto };
    const res = await this.carModel.create(car);
    return res;
  }

  async findAll() {
    const res = this.carModel.find().exec();
    return res;
  }

  async findOne(id: string): Promise<string | Car> {
    const res = await this.carModel.findOne({ _id: id }).exec();
    if (res) return res;
    return 'error';
  }

  async delete(id: string) {
    const deletedCar = await this.carModel.findOneAndDelete({ _id: id }).exec();
    return deletedCar;
  }
}
