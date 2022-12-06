import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Roles} from "@/modules/roles/roles.model";
import {Users} from "@/modules/users/users.model";
import {UserRoles} from "@/modules/roles/user-role.model";
import {Permission} from "@/modules/permissions/permissions.model";
import {PermissionRole} from "@/modules/permissions/permission-role.model";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Roles, Users, UserRoles, Permission, PermissionRole])],
  exports: [RolesService]
})
export class RolesModule {}
