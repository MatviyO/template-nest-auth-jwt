import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {PermissionRole} from "@/modules/permissions/permission-role.model";
import { RolesService } from '@/modules/roles/roles.service';
import { RolesController } from '@/modules/roles/roles.controller';
import { Role } from '@/modules/roles/role.model';
import { User } from '@/modules/users/user.model';
import { UserRole } from '@/modules/roles/user-role.model';
import { Permission } from '@/modules/permissions/permission.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRole, Permission, PermissionRole])],
  exports: [RolesService]
})
export class RolesModule {}
