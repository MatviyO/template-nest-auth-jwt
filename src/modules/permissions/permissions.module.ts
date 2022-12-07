import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {PermissionRole} from "@/modules/permissions/permission-role.model";
import {PermissionsService} from "@/modules/permissions/permissions.service";
import {PermissionsController} from "@/modules/permissions/permissions.controller";
import { Permission } from '@/modules/permissions/permission.model';
import { Role } from '@/modules/roles/role.model';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [SequelizeModule.forFeature([Permission, Role, PermissionRole])],
  exports: [PermissionsService]
})
export class PermissionsModule {}
