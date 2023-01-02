import {Module, ValidationPipe} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {APP_FILTER, APP_PIPE, RouterModule} from "@nestjs/core";
import {routes} from "./consts/routes";
import {AllExceptionsFilter} from "@/exeptions/all-exceptions.filter";
import {PermissionRole} from "@/modules/permissions/permission-role.model";
import {PermissionsModule} from "@/modules/permissions/permissions.module";
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserRole } from '@/modules/roles/user-role.model';
import { UsersModule } from '@/modules/users/users.module';
import { RolesModule } from '@/modules/roles/roles.module';
import { Permission } from '@/modules/permissions/permission.model';
import { Role } from '@/modules/roles/role.model';
import { User } from '@/modules/users/user.model';
import { JwtModule } from '@nestjs/jwt';
import {ServeStaticModule} from "@nestjs/serve-static";
import { PostsModule } from './modules/posts/posts.module';
import * as path from 'path';
import { Post } from '@/modules/posts/post.model';

const env = process.env;

@Module({
  imports: [
      ConfigModule.forRoot({envFilePath: `./environment/.${env.NODE_ENV}.env`}),
      ServeStaticModule.forRoot({
          rootPath: path.resolve( __dirname, 'static'),
      }),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: env.POSTGRES_HOST,
          port: Number(env.POSTGRES_PORT),
          username: env.POSTGRES_USER,
          password: String(env.POSTGRES_PASSWORD),
          database: env.POSTGRES_DB,
          models: [User, Role, UserRole, Permission, PermissionRole, Post],
          autoLoadModels: true
      }),
      UsersModule,
      RolesModule,
      PermissionsModule,
      RouterModule.register(routes),
      AuthModule,
      PostsModule,
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
