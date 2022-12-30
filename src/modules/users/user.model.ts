import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEmail, IsNotEmpty, IsString} from "@nestjs/class-validator";
import {Exclude, Transform, TransformFnParams} from "@nestjs/class-transformer";

import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UserRole } from '@/modules/roles/user-role.model';
import { Role } from "../roles/role.model";

@Table({tableName: 'Users'})
export class User extends Model<User, CreateUserDto> {
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true
    })
    id: number;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column( {
        type: DataType.STRING, unique: true, allowNull: false
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Exclude()
    @Column( {
        type: DataType.STRING, allowNull: false
    })
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    @Column( {
        type: DataType.BOOLEAN, defaultValue: false
    })
    active: boolean;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]
}
