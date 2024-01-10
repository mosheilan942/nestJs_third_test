import { Controller, Post, Body, Get, UseInterceptors, Patch, Param, Delete, UseFilters, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { HttpExceptionFilter } from '../errors/http-exception.filter';
import { UpdateUserDto } from '../dto/update-user.dto';

/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/user
 */

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

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

    /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create User will be
   * POST http://localhost:3000/user
   */

    @Post('signup')
    // @UseFilters(new HttpExceptionFilter)
    create(@Body() createUserDto: CreateUserDto) {
        // throw new ForbiddenException();
        this.usersService.createUser(createUserDto);
    }

    /**
     * we have used get decorator to get all the user's list
     * so the API URL will be
     * GET http://localhost:3000/user
     */
    @Get()
    findAll() {
        return this.usersService.findAllUser();
    }

    /**
     * we have used get decorator with id param to get id from request
     * so the API URL will be
     * GET http://localhost:3000/user/:id
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    /**
     * we have used patch decorator with id param to get id from request
     * so the API URL will be
     * PATCH http://localhost:3000/user/:id
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    /**
     * we have used Delete decorator with id param to get id from request
     * so the API URL will be
     * DELETE http://localhost:3000/user/:id
     */

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.removeUser(Number(id));
    }
}