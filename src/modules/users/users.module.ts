import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Users} from "./users.model";
import {Roles} from "@/modules/roles/roles.model";
import {RolesModule} from "@/modules/roles/roles.module";
import {UserRoles} from "@/modules/roles/user-role.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([Users, Roles, UserRoles]),
      RolesModule
  ]
})
export class UsersModule {}
