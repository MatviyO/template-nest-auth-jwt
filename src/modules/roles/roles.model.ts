import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "@nestjs/class-validator";
import {Transform, TransformFnParams} from "@nestjs/class-transformer";
import {IRole, IRoleCreation} from "@/modules/roles/IRole";
import {Users} from "@/modules/users/users.model";
import {IUser} from "@/modules/users/IUser";
import {UserRoles} from "@/modules/roles/user-role.model";
import {IPermission} from "@/modules/permissions/IPermission";
import {Permission} from "@/modules/permissions/permissions.model";
import {PermissionRole} from "@/modules/permissions/permission-role.model";

@Table({tableName: 'roles'})
export class Roles extends Model<IRole, IRoleCreation> {
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

    @BelongsToMany(() => Users, () => UserRoles)
    users: IUser[]

    @BelongsToMany(() => Permission, () => PermissionRole, "permission_id", "role_id")
    permissions: IPermission[];
}
