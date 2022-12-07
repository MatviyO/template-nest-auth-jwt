import { Injectable } from '@nestjs/common';
import {IAuthService} from "@/modules/auth/IAuth";
import {CreateUserDto} from "@/modules/users/dto/create-user.dto";
import {UsersService} from "@/modules/users/users.service";

@Injectable()
export class AuthService implements IAuthService{
    constructor(private userService: UsersService) {
    }

    async login(userDto: CreateUserDto): Promise<any> {
        return Promise.resolve(undefined);
    }

    async registration(userDto: CreateUserDto): Promise<any> {
        return Promise.resolve(undefined);
    }

}
