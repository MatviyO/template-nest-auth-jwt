import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Roles} from "@/modules/roles/roles.model";
import {Permission} from "@/modules/permissions/permissions.model";

@Table({tableName: 'permissions_role', createdAt: false, updatedAt: false})
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

    @ForeignKey(() => Roles)
    @ApiProperty()
    @Column( {
        type: DataType.INTEGER,
    })
    role_id: string;

    @BelongsTo(() => Roles)
    role: Roles;
}
