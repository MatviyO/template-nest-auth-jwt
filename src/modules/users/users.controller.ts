import {Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors} from '@nestjs/common';
import {CreateUserDto} from "@/modules/users/dto/create-user.dto";
import {UsersService} from "@/modules/users/users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UsersModel} from "@/modules/users/users.model";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Creation User'})
    @ApiResponse({status: 201, type: UsersModel})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Get Users'})
    @ApiResponse({status: 200, type: [UsersModel]})
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }
}
