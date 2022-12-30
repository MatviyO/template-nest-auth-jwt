import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { Role } from '@/modules/roles/role.model';
import { Permission } from '@/modules/permissions/permission.model';

@Table({tableName: 'Permissions_Role', createdAt: false, updatedAt: false})
export class PermissionRole extends Model<PermissionRole> {
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true
    })
    id: number;

    @ForeignKey(() => Permission)
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER,
    })
    permission_id: number;

    @ForeignKey(() => Role)
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER,
    })
    role_id: string;

    @BelongsTo(() => Role)
    role: Role;
}
