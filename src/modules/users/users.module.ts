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
import { Post } from '@/modules/posts/post.model';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRole, Post]),
      forwardRef(() => AuthModule),
      forwardRef(() => RolesModule),
  ],
    exports: [UsersService]
})
export class UsersModule {}
