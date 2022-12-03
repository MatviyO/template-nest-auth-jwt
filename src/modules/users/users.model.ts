import {Column, DataType, Model, Table} from "sequelize-typescript";
import {IUser, IUserCreation} from "./IUser";
import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEmail, IsNotEmpty, IsString} from "@nestjs/class-validator";
import {Exclude, Transform, TransformFnParams} from "@nestjs/class-transformer";

@Table({tableName: 'users'})
export class UsersModel extends Model<IUser, IUserCreation> {
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

    @IsString()
    @ApiProperty()
    @Column( {
        type: DataType.STRING, defaultValue: ''
    })
    activateMessage: string;

}
