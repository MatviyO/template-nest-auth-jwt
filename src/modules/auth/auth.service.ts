import { BadRequestException, Injectable } from '@nestjs/common';
import {IAuthService} from "@/modules/auth/IAuth";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UsersService } from '@/modules/users/users.service';
import { User } from '@/modules/users/user.model';

@Injectable()
export class AuthService implements IAuthService{
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async login(userDto: CreateUserDto): Promise<any> {
        return Promise.resolve(undefined);
    }

    async registration(userDto: CreateUserDto): Promise<any> {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new BadRequestException(
              'Account with this email already exists.',
            );
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({...userDto, password: hashPassword});
        return Promise.resolve(undefined);
    }

    async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {token: this.jwtService.sign(payload)}
    }

}
