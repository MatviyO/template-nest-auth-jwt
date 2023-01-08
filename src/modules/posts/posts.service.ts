import { Injectable } from '@nestjs/common';
import { Post } from '@/modules/posts/post.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from '@/modules/posts/dto/CreatePostDto';
import { FilesService } from '@/files/files.service';

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postRepository: typeof Post,
              private filesService: FilesService) {
  }

  async create(dto: CreatePostDto, image: File): Promise<Post> {
    const fileName = await this.filesService.createFile(image);
    const post = await this.postRepository.create({...dto, image: fileName})
    return post;
  }
}
