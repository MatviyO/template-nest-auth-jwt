import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import { IRolesService } from '@/modules/roles/IRole';
import { Role } from '@/modules/roles/role.model';
import { CreateRoleDto } from '@/modules/roles/dto/create-role.dto';

@Injectable()
export class RolesService implements IRolesService{

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    }

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const role = await this.checkExistingRole(dto)
        if (role) {
            throw new BadRequestException(
                'Account with this role already exists.',
            );
        }
        return await this.roleRepository.create(dto);
    }

    async getAllRole(): Promise<Role[]> {
        return await this.roleRepository.findAll({raw: true}) || null;
    }

    async getRoleByName(name: string): Promise<Role | null> {
        return await this.roleRepository.findOne({ where: { name: name}, raw: true}) || null;
    }

    async checkExistingRole(dto: CreateRoleDto): Promise<Role | null> {
        return await this.roleRepository.findOne({ where: { name: dto.name}, raw: true}) || null;
    }
}
