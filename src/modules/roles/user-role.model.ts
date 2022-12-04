import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {RolesModel} from "@/modules/roles/roles.model";
import {UsersModel} from "@/modules/users/users.model";

@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true
    })
    id: number;

    @ForeignKey(() => RolesModel)
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER,
    })
    roleId: number;

    @ForeignKey(() => UsersModel)
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER,
    })
    userId: number;
}
