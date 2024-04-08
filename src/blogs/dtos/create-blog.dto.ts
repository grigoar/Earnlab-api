import { IsString } from 'class-validator';
import { CreateBlog } from '../types/create-blog.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto implements CreateBlog {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  body: string;
}
