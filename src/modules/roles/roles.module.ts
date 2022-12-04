import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {RolesModel} from "@/modules/roles/roles.model";
import {UsersModel} from "@/modules/users/users.model";
import {UserRoles} from "@/modules/roles/user-role.model";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([RolesModel, UsersModel, UserRoles])],
  exports: [RolesService]
})
export class RolesModule {}
