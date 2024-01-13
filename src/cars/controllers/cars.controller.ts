import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CarsService } from '../services/cars.service';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';



@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    await this.carsService.create(createCarDto);
  }

  @Get()
  async findAll(){
    return this.carsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.carsService.delete(id);
  }

}