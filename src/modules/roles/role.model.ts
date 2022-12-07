import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "@nestjs/class-validator";
import {Transform, TransformFnParams} from "@nestjs/class-transformer";
import {IPermission} from "@/modules/permissions/IPermission";
import {PermissionRole} from "@/modules/permissions/permission-role.model";
import { UserRole } from '@/modules/roles/user-role.model';
import { IRoleCreation } from '@/modules/roles/IRole';
import { User } from "../users/user.model";
import { Permission } from '@/modules/permissions/permission.model';

@Table({tableName: 'Role'})
export class Role extends Model<Role, IRoleCreation> {
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true
    })
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column( {
        type: DataType.STRING, unique: true, allowNull: false
    })
    name: string;

    @BelongsToMany(() => User, () => UserRole)
    User: User[]

    @BelongsToMany(() => Permission, () => PermissionRole, "permission_id", "role_id")
    permissions: IPermission[];
}
