import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "@nestjs/class-validator";
import {Transform, TransformFnParams} from "@nestjs/class-transformer";
import {CreatePermissionDto} from "@/modules/permissions/dto/create-permission.dto";
import {PermissionRole} from "@/modules/permissions/permission-role.model";
import { Role } from "../roles/role.model";

@Table({tableName: 'permissions'})
export class Permission extends Model<Permission, CreatePermissionDto> {
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

    @BelongsToMany(() => Role, () => PermissionRole)
    Role: Role[];
}
