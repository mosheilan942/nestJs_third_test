import { Get, HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const checkIfExist = this.findByUsername(createUserDto.username)
    if (checkIfExist) 
    throw new HttpException('user already exist', HttpStatus.OK)
    try {
      const user: CreateUserDto = {
        ...createUserDto,
        password: createUserDto.password
      };
      return this.userRepository.save(user);

    } catch (error) {
      throw new HttpException('Forbidden', error);
    }
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of user.
   * @param updateUserDto this is partial type of createUserDto.
   * @returns promise of udpate user
   */
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const user: UpdateUserDto = {
      ...updateUserDto,
    };
    return this.userRepository.update(id, user);

  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  removeUser(id: string): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}