import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersModel} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {IUser} from "./IUser";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UsersModel) private userRepository: typeof UsersModel) {
    }

    async createUser(dto: CreateUserDto): Promise<IUser> {
        const user = await this.checkExistingUser(dto)
        if (user) {
            throw new BadRequestException(
                'Account with this email already exists.',
            );
        }
        return await this.userRepository.create(dto);
    }

    async getAllUsers(): Promise<IUser[]> {
        const users = await this.userRepository.findAll()
        return users || [];
    }

    async checkExistingUser(dto: CreateUserDto): Promise<UsersModel | null> {
        return await this.userRepository.findOne({ where: { email: dto.email}}) || null;
    }
}
