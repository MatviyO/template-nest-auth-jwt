import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "@nestjs/class-validator";
import {Transform, TransformFnParams} from "@nestjs/class-transformer";
import {IPermission} from "@/modules/permissions/IPermission";
import {CreatePermissionDto} from "@/modules/permissions/dto/create-permission.dto";
import {IRole} from "@/modules/roles/IRole";
import {Roles} from "@/modules/roles/roles.model";
import {PermissionRole} from "@/modules/permissions/permission-role.model";

@Table({tableName: 'permissions'})
export class Permission extends Model<IPermission, CreatePermissionDto> {
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

    @BelongsToMany(() => Roles, () => PermissionRole)
    roles: IRole[];
}
