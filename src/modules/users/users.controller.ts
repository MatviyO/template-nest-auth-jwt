import {Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UsersService } from '@/modules/users/users.service';
import { User } from '@/modules/users/user.model';

@ApiTags('Users')
@Controller('Users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Creation User'})
    @ApiResponse({status: 201, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Get User'})
    @ApiResponse({status: 200, type: [User]})
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getAll() {
        return this.usersService.getAllUser();
    }
}
