import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Roles} from "@/modules/roles/roles.model";
import {CreateRoleDto} from "@/modules/roles/dto/create-role.dto";
import {IRole, IRoleService} from "@/modules/roles/IRole";

@Injectable()
export class RolesService implements IRoleService{

    constructor(@InjectModel(Roles) private roleRepository: typeof Roles) {
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

    async getRoleByName(name: string): Promise<IRole | null> {
        return await this.roleRepository.findOne({ where: { name: name}, raw: true}) || null;
    }

    async checkExistingRole(dto: CreateRoleDto): Promise<IRole | null> {
        return await this.roleRepository.findOne({ where: { name: dto.name}, raw: true}) || null;
    }
}
