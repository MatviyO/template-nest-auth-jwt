import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "./modules/users/users.module";
import {dbConfig, envCOnfig} from "./consts/db";

@Module({
  imports: [
      ConfigModule.forRoot(envCOnfig),
      SequelizeModule.forRoot(dbConfig),
      UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
