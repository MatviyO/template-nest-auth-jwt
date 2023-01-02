import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('v')
@Controller('Posts')
export class PostsController {}
