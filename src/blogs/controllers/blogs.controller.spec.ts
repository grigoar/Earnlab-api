import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from '../services/blogs.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const mockBlogService = {
  geBlog: jest.fn(),
  getBlogs: jest.fn(),
  createBlog: jest.fn(),
};

describe('BlogController', () => {
  let controller: BlogsController;

  beforeEach(async () => {
    const blogServiceProvider = {
      provide: BlogsService,
      useFactory: () => mockBlogService,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        blogServiceProvider,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
      controllers: [BlogsController],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
