import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";

const env = process.env;

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: './environment/env'
      }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: env.POSTGRES_HOST,
        port: Number(env.POSTGRES_PORT),
        username: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD,
        database: env.POSTGRES_DB,
        models: [],
        autoLoadModels: true
      }),
      UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
