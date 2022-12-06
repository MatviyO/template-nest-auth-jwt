import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {Roles} from "@/modules/roles/roles.model";
import {Permission} from "@/modules/permissions/permissions.model";
import {PermissionRole} from "@/modules/permissions/permission-role.model";
import {PermissionsService} from "@/modules/permissions/permissions.service";
import {PermissionsController} from "@/modules/permissions/permissions.controller";

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [SequelizeModule.forFeature([Permission, Roles, PermissionRole])],
  exports: [PermissionsService]
})
export class PermissionsModule {}
