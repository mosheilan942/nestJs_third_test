import { Controller, Delete, Get, Post, UseInterceptors } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateDataDto } from './dtos/create-data.dto';
import { AppService } from './app.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';


@Controller('Cache')
@UseInterceptors(CacheInterceptor)

export class AppController {
  constructor(private readonly appService: AppService) {}

  @CacheTTL(5)
  @Get('hi')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  async getData() {
    try {
      return await this.appService.getData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  @Post()
  async postData(@Body() createDataDto: CreateDataDto) {
    try {
      return await this.appService.postData(createDataDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  @Delete()
  async deleteData() {
    try {
      return await this.appService.deleteData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

