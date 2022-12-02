import {Injectable} from '@nestjs/common';
import {UsersModel} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {IUser} from "./IUser";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UsersModel) private userRepository: typeof UsersModel) {
    }

    async createUser(dto: CreateUserDto): Promise<IUser> {
        return await this.userRepository.create(dto);

    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userRepository.findAll();
    }
}
