import { forwardRef, Module } from '@nestjs/common';

import {SequelizeModule} from "@nestjs/sequelize";
import { UsersService } from '@/modules/users/users.service';
import { RolesModule } from '@/modules/roles/roles.module';
import { UsersController } from '@/modules/users/users.controller';
import { User } from '@/modules/users/user.model';
import { Role } from '@/modules/roles/role.model';
import { UserRole } from '@/modules/roles/user-role.model';
import { AuthModule } from '@/modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRole]),
      forwardRef(() => AuthModule),
      forwardRef(() => RolesModule),
  ],
    exports: [UsersService]
})
export class UsersModule {}
