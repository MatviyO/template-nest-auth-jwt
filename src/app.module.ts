import {Module, ValidationPipe} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "./modules/users/users.module";
import {APP_FILTER, APP_PIPE, RouterModule} from "@nestjs/core";
import {routes} from "./consts/routes";
import {UsersModel} from "@/modules/users/users.model";
import {AllExceptionsFilter} from "@/exeptions/all-exceptions.filter";
import { RolesModule } from './modules/roles/roles.module';
import {RolesModel} from "@/modules/roles/roles.model";
import {UserRoles} from "@/modules/roles/user-role.model";

const env = process.env;

@Module({
  imports: [
      ConfigModule.forRoot({envFilePath: `./environment/.${env.NODE_ENV}.env`}),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: env.POSTGRES_HOST,
          port: Number(env.POSTGRES_PORT),
          username: env.POSTGRES_USER,
          password: String(env.POSTGRES_PASSWORD),
          database: env.POSTGRES_DB,
          models: [UsersModel, RolesModel, UserRoles],
          autoLoadModels: true
      }),
      UsersModule,
      RolesModule,
      RouterModule.register(routes),
      RolesModule,
  ],
  controllers: [],
  providers: [
      {
          provide: APP_PIPE,
          useClass: ValidationPipe,
      },
      {
          provide: APP_FILTER,
          useClass: AllExceptionsFilter,
      },
  ],
})
export class AppModule {}
