import {BadRequestException, Injectable} from '@nestjs/common';
import {Users} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {IUser} from "./IUser";
import {RolesService} from "@/modules/roles/roles.service";
import {Role} from "@/modules/roles/IRole";
import {Roles} from "@/modules/roles/roles.model";

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users) private userRepository: typeof Users,
                private rolesService: RolesService) {
    }

    async createUser(dto: CreateUserDto): Promise<IUser> {
        const user = await this.checkExistingUser(dto);
        console.log(user, 'user')
        if (user) {
            throw new BadRequestException(
                'Account with this email already exists.',
            );
        }
        const newUser = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByType(Role.USER)
        await newUser.$set('roles', [role.id])
        return newUser;
    }

    async getAllUsers(): Promise<IUser[]> {
        const users = await this.userRepository.findAll<Users>({raw: true,  include: {all: true}})
        return users || [];
    }

    async checkExistingUser(dto: CreateUserDto): Promise<Users | null> {
        return await this.userRepository.findOne({ where: { email: dto.email}}) || null;
    }
}
