import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Roles} from "@/modules/roles/roles.model";
import {Users} from "@/modules/users/users.model";

@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true
    })
    id: number;

    @ForeignKey(() => Roles)
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER,
    })
    roleId: number;

    @ForeignKey(() => Users)
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER,
    })
    userId: number;
}
