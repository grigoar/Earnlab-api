import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BLogEntity } from 'src/database/entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlog } from '../types/create-blog.type';
import { GetAllBlogsQueries } from '../types/get-all-blogs-queries.types';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BLogEntity)
    private blogRepository: Repository<BLogEntity>,
  ) {}

  async getBlogs(queries: GetAllBlogsQueries) {
    try {
      // Return all the blogs paginated AND cached
      const rowsPerPage = parseInt(queries.rowsPerPage, 10) || 10;
      const page = parseInt(queries.page, 10) || 1;
      const order = queries.order === 'ASC' ? 'ASC' : 'DESC';

      const blogs = await this.blogRepository.find({
        order: { id: order },
        take: rowsPerPage,
        skip: (page - 1) * rowsPerPage,
      });

      return blogs;
    } catch (e) {
      console.log(e);
    }
  }

  async getBlog(id: string) {
    try {
      return await this.blogRepository.findOne({
        where: { id },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async createBlog(blog: CreateBlog) {
    try {
      return await this.blogRepository.save(blog);
    } catch (e) {
      console.log(e);
    }
  }
}
