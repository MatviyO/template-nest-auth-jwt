import {Module, ValidationPipe} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from "./modules/users/users.module";
import {APP_FILTER, APP_PIPE, RouterModule} from "@nestjs/core";
import {routes} from "./consts/routes";
import {Users} from "@/modules/users/users.model";
import {AllExceptionsFilter} from "@/exeptions/all-exceptions.filter";
import { RolesModule } from './modules/roles/roles.module';
import {Roles} from "@/modules/roles/roles.model";
import {UserRoles} from "@/modules/roles/user-role.model";
import {Permission} from "@/modules/permissions/permissions.model";
import {PermissionRole} from "@/modules/permissions/permission-role.model";
import {PermissionsModule} from "@/modules/permissions/permissions.module";
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';

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
          models: [Users, Roles, UserRoles, Permission, PermissionRole],
          autoLoadModels: true
      }),
      UsersModule,
      RolesModule,
      RolesModule,
      PermissionsModule,
      RouterModule.register(routes),
      AuthModule,
  ],
  controllers: [AuthController],
  providers: [
      {
          provide: APP_PIPE,
          useClass: ValidationPipe,
      },
      {
          provide: APP_FILTER,
          useClass: AllExceptionsFilter,
      },
      AuthService,
  ],
})
export class AppModule {}
