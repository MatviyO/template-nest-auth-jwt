import { CreateRoleDto } from '@/modules/roles/dto/create-role.dto';

export interface IRole {
    id: number;
    name: string;
}

export interface IRoleCreation extends Pick<IRole, 'name'>{}

export enum Roles {
    USER = "User",
    ADMIN = "Admin",
}

export interface IRolesService {
    createRole: (userDto: CreateRoleDto) => Promise<IRole>
    getAllRole: () => Promise<IRole[] | null>
    getRoleByName: (value: string) => Promise<IRole>
    checkExistingRole: (userDto: CreateRoleDto) => Promise<IRole>
}
