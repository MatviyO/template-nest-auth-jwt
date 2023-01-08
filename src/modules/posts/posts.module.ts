import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from '@/modules/posts/post.model';
import { User } from '@/modules/users/user.model';
import { FilesModule } from '@/files/files.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule,
  ],
  exports: [PostsService]
})
export class PostsModule {}
