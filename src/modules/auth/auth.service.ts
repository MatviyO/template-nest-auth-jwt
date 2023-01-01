import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthentification, IAuthService } from '@/modules/auth/IAuth';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UsersService } from '@/modules/users/users.service';
import { User } from '@/modules/users/user.model';
import { MESSAGE } from '@/consts/message';

@Injectable()
export class AuthService implements IAuthService{
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async login(userDto: CreateUserDto): Promise<IAuthentification> {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto): Promise<IAuthentification> {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new BadRequestException({ message: MESSAGE.userExist });
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: User): Promise<IAuthentification> {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {token: this.jwtService.sign(payload, { secret: process.env.PRIVATE_KEY })}
    }

    private async validateUser(userDto: CreateUserDto): Promise<User | null>  {
        const user  = await this.usersService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: MESSAGE.unAuth});
    }
}
