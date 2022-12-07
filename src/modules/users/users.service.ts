import {BadRequestException, Injectable} from '@nestjs/common';
import {User} from "./User.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import { RolesService } from '@/modules/roles/roles.service';
import { Roles } from '@/modules/roles/IRole';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private rolesService: RolesService) {
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.getUserByEmail(dto.email);
        console.log(user, 'user')
        if (user) {
            throw new BadRequestException(
                'Account with this email already exists.',
            );
        }
        const newUser = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByName(Roles.USER)
        await newUser.$set('roles', [role.id])
        return newUser;
    }

    async getAllUser(): Promise<User[]> {
        const User = await this.userRepository.findAll<User>({raw: true,  include: {all: true}})
        return User || [];
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email}, include: {all: true}}) || null;
    }
}
