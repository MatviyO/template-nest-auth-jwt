import {UsersModel} from "../modules/users/users.model";
import {SequelizeModuleOptions} from "@nestjs/sequelize/dist/interfaces/sequelize-options.interface";
import {ConfigModuleOptions} from "@nestjs/config/dist/interfaces";

const env = process.env;

export const envCOnfig: ConfigModuleOptions = {
    envFilePath: `./environment/.${env.NODE_ENV}.env`
}

export const dbConfig: SequelizeModuleOptions = {
    dialect: 'postgres',
    host: env.POSTGRES_HOST,
    port: Number(env.POSTGRES_PORT),
    username: env.POSTGRES_USER,
    password: String(env.POSTGRES_PASSWORD),
    database: env.POSTGRES_DB,
    models: [UsersModel],
    autoLoadModels: true
}
