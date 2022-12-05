import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RolesModel} from "@/modules/roles/roles.model";
import {CreateRoleDto} from "@/modules/roles/dto/create-role.dto";
import {IRole} from "@/modules/roles/IRole";

@Injectable()
export class RolesService {

    constructor(@InjectModel(RolesModel) private roleRepository: typeof RolesModel) {
    }

    async createRole(dto: CreateRoleDto): Promise<IRole> {
        const role = await this.checkExistingRole(dto)
        if (role) {
            throw new BadRequestException(
                'Account with this role already exists.',
            );
        }
        return await this.roleRepository.create(dto);
    }

    async getAllRoles(): Promise<IRole[]> {
        return await this.roleRepository.findAll({raw: true}) || null;
    }

    async getRoleByType(type: string): Promise<IRole | null> {
        return await this.roleRepository.findOne({ where: { type: type}, raw: true}) || null;
    }

    async checkExistingRole(dto: CreateRoleDto): Promise<IRole | null> {
        return await this.roleRepository.findOne({ where: { type: dto.type}, raw: true}) || null;
    }
}
