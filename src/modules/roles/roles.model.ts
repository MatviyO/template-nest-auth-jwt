import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "@nestjs/class-validator";
import {Transform, TransformFnParams} from "@nestjs/class-transformer";
import {IRole, IRoleCreation} from "@/modules/roles/IRole";
import {UsersModel} from "@/modules/users/users.model";
import {IUser} from "@/modules/users/IUser";
import {UserRoles} from "@/modules/roles/user-role.model";

@Table({tableName: 'roles'})
export class RolesModel extends Model<IRole, IRoleCreation> {
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
    type: string;

    @BelongsToMany(() => UsersModel, () => UserRoles)
    users: IUser[]
}
