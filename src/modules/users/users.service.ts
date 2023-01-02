import {BadRequestException, Injectable} from '@nestjs/common';
import {User} from "./User.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import { RolesService } from '@/modules/roles/roles.service';
import { Roles } from '@/modules/roles/IRole';
import { AddRoleDto } from '@/modules/users/dto/add-role.dto';
import { BanUserDto } from '@/modules/users/dto/ban-user.dto';
import { MESSAGE } from '@/consts/message';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private rolesService: RolesService) {
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.getUserByEmail(dto.email);
        if (user) {
            throw new BadRequestException(
                'Account with this email already exists.',
            );
        }
        const newUser = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByName(Roles.USER)
        if (role) {
            await newUser.$set('roles', [role.id])
            newUser.roles = [role]
        }
        return newUser;
    }

    async getAllUser(): Promise<User[]> {
        const User = await this.userRepository.findAll<User>({raw: true,  include: {all: true, foreignKey: "roles"},})
        return User || [];
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email}, include: {all: true}}) || null;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new BadRequestException({ message: MESSAGE.haventUser})
        }
        const role = await this.rolesService.getRoleByName(dto.value);
        if (!role) {
            throw new BadRequestException({ message: MESSAGE.haventRole})
        }
        if (role && user) {
            await user.$add('roles', role.id)
            return dto;
        }
    }

    async banRole(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new BadRequestException({ message: MESSAGE.haventUser})
        }
        user.active = true;
        await user.save();
        return user;
    }
}
