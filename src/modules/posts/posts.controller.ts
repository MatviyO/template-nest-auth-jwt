import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostsService } from '@/modules/posts/posts.service';
import { CreatePostDto } from '@/modules/posts/dto/CreatePostDto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Posts')
@Controller('Posts')
export class PostsController {

  constructor(private postService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(dto, image)
  }
}
