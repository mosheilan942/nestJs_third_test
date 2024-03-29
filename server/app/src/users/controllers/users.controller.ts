import {
  Controller,
  BadRequestException,
  Post,
  Body,
  Get,
  UseInterceptors,
  Patch,
  Param,
  Delete,
  UseFilters,
  ForbiddenException,
  UseGuards,
  HttpCode,
  HttpStatus,
  Inject,
  forwardRef,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from '../../auth/guards/token/auth.guard';
import { log } from 'console';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('data')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10) // Cache for 10 seconds
  getData() {
    return this.usersService.findAllUser();
  }

  // @Get()
  // viewUser(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.findByEmail(createUserDto.email);
  // }

  // @UseGuards(AuthGuard)
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = this.usersService.createUser(createUserDto);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('allusers')
  findAll() {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  // @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request) {
    console.log(request.decodedData);
    return this.usersService.removeUser(id);
  }
}
