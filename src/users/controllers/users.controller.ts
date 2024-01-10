import { Controller, Post, Body, Get, UseInterceptors, Patch, Param, Delete, UseFilters, ForbiddenException, UseGuards, HttpCode, HttpStatus, Inject, forwardRef, Req } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from '../../auth/guards/admin/auth.guard';

/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/user
 */

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get('data')
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(10) // Cache for 10 seconds
    getData() {
        return this.usersService.findAllUser();
    }

    @Get()
    viewUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.findByUsername(createUserDto.username);

    }

    // @UseGuards(AuthGuard)
    @Post('signup')
    create(@Body() createUserDto: CreateUserDto) {
        this.usersService.createUser(createUserDto);
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
    remove(@Param('id') id: string) {
        return this.usersService.removeUser(id);
    }

}