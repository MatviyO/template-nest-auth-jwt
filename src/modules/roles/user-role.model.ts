import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { Role } from '@/modules/roles/role.model';
import { User } from '@/modules/users/user.model';


@Table({tableName: 'user_Role', createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole> {
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true
    })
    id: number;

    @ForeignKey(() => Role)
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER,
    })
    roleId: number;

    @ForeignKey(() => User)
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER,
    })
    userId: number;
}
