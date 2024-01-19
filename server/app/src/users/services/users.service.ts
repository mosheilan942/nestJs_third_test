import {
  BadRequestException,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity. postgres';
import { hashPassword } from '../utils/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const checkIfExist = await this.findByEmail(createUserDto.email);
      if (checkIfExist) throw new BadRequestException('user already exist');
      const user: CreateUserDto = {
        ...createUserDto,
        password: createUserDto.password,
      };
      const hash = hashPassword(user.password);
      user.password = await hash;
      return this.userRepository.save(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const user: UpdateUserDto = {
      ...updateUserDto,
    };
    return this.userRepository.update(id, user);
  }

  removeUser(id: string): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
