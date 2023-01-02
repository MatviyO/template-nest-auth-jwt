import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UsersService } from '@/modules/users/users.service';
import { User } from '@/modules/users/user.model';
import { Roles } from '@/modules/roles/roles-auth.decorator';
import { RolesGuard } from '@/modules/roles/roles.guard';
import { AddRoleDto } from '@/modules/users/dto/add-role.dto';
import { BanUserDto } from '@/modules/users/dto/ban-user.dto';

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

    @ApiOperation({summary: 'Get Users'})
    @ApiResponse({status: 200, type: [User]})
    @UseInterceptors(ClassSerializerInterceptor)
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUser();
    }

    @ApiOperation({summary: 'Add Role'})
    @ApiResponse({status: 200})
    @UseInterceptors(ClassSerializerInterceptor)
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban User'})
    @ApiResponse({status: 200})
    @UseInterceptors(ClassSerializerInterceptor)
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.banRole(dto);
    }
}
