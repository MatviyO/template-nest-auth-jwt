import {Column, DataType, Model, Table} from "sequelize-typescript";
import {IUser, IUserCreation} from "./IUser";

@Table({tableName: 'users'})
export class UsersModel extends Model<IUser, IUserCreation> {
    @Column( {
        type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true
    })
    id: number;

    @Column( {
        type: DataType.STRING, unique: true, allowNull: false
    })
    email: string;

    @Column( {
        type: DataType.STRING, allowNull: false
    })
    password: string;

    @Column( {
        type: DataType.BOOLEAN, defaultValue: false
    })
    active: boolean;

    @Column( {
        type: DataType.STRING, defaultValue: ''
    })
    activateMessage: string;

}
