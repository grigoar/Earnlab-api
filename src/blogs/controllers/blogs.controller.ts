import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BlogsService } from '../services/blogs.service';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetAllBlogsQueries } from '../types/get-all-blogs-queries.types';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Blog } from 'src/database/types/blog.type';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogService: BlogsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOperation({
    description: 'Get All the Blogs paginated and cached',
    summary: 'Get All Blogs',
  })
  @Get()
  async getBlogs(@Query() queries: GetAllBlogsQueries) {
    try {
      const key = `blogs-${queries.page}-${queries.rowsPerPage}-${queries.order}`;

      const blogsCache: Blog[] = await this.cacheManager.get(key);
      if (blogsCache) {
        console.log('Returning from cache...');
        return {
          nrOfBlogs: blogsCache.length,
          blogs: blogsCache,
        };
      }

      const blogs = await this.blogService.getBlogs(queries);

      // * TTL in milliseconds
      const TTL = 5 * 60 * 1000;
      this.cacheManager.set(key, blogs, TTL);
      return {
        nrOfBlogs: blogs.length,
        blogs,
      };
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  @ApiOperation({
    description: 'Get a Blog by ID',
    summary: 'Get Blog',
  })
  @Get(':id')
  async getBlog(@Param('id') id: string) {
    try {
      return await this.blogService.getBlog(id);
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }

  @ApiOperation({
    description: 'Create a new Blog',
    summary: 'Create Blog',
  })
  @ApiOkResponse({
    description: 'Blog Created Successfully',
    status: 201,
  })
  @Post()
  async createBlog(@Body() blog: CreateBlogDto) {
    try {
      await this.blogService.createBlog({
        title: blog.title,
        body: blog.body,
      });

      return {
        message: 'Blog Created Successfully',
      };
    } catch (e) {
      return {
        message: e.message,
      };
    }
  }
}
