import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; 
import { CreateDataDto } from './dtos/create-data.dto';


@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getData(): Promise<string | undefined> {
    const value = await this.cacheManager.get<string>('key')    
    return value;
  }
  async postData(createDataDto:CreateDataDto) {
    const { value } = createDataDto;    
    await this.cacheManager.set('key', value)
  }
  async deleteData() {
    await this.cacheManager.del('key')
  }
}



