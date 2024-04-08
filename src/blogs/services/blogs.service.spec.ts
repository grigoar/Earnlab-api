import { Test, TestingModule } from '@nestjs/testing';
import { BlogsService } from './blogs.service';
import { Repository } from 'typeorm';
import { BLogEntity } from '../../database/entities/blog.entity';
import { CreateBlog } from '../types/create-blog.type';
import { GetAllBlogsQueries } from '../types/get-all-blogs-queries.types';

const mockBlogRepository = {
  geBlog: jest.fn(),
  getBlogs: jest.fn(),
  createBlog: jest.fn(),
};

describe('BlogService', () => {
  let service: BlogsService;
  let blogRepository: Repository<BLogEntity>;

  beforeEach(async () => {
    const blogRepositoryProvider = {
      provide: Repository<BLogEntity>,
      useFactory: () => mockBlogRepository,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        { provide: 'BLogEntityRepository', useValue: blogRepositoryProvider },
      ],
    }).compile();

    service = module.get<BlogsService>(BlogsService);
    blogRepository = module.get<Repository<BLogEntity>>('BLogEntityRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBlog', () => {
    it('should create a new blog', async () => {
      const newBlog: CreateBlog = {
        title: 'New Blog',
        body: 'Blog Content',
      };

      const mockBLogEntity: BLogEntity = new BLogEntity();
      blogRepository.save = jest.fn().mockResolvedValue(mockBLogEntity);

      const result = await service.createBlog(newBlog);

      expect(result).toEqual(mockBLogEntity);
    });
  });

  describe('getBlog', () => {
    it('should return a blog by id', async () => {
      const blogId = '1';
      const mockBlog: BLogEntity = new BLogEntity();
      mockBlog.id = blogId;
      blogRepository.findOne = jest.fn().mockResolvedValue(mockBlog);

      const result = await service.getBlog(blogId);

      expect(result).toEqual(mockBlog);
    });

    it('should return null if blog is not found', async () => {
      const blogId = '100';
      blogRepository.findOne = jest.fn().mockResolvedValue(null);

      const result = await service.getBlog(blogId);

      expect(result).toBeNull();
    });
  });

  describe('getBlogs', () => {
    it('should return all blogs', async () => {
      const getBlogsQueries: GetAllBlogsQueries = {
        page: '1',
        rowsPerPage: '10',
        order: 'ASC',
      };
      const mockBlogs: BLogEntity[] = [
        new BLogEntity(),
        new BLogEntity(),
        new BLogEntity(),
      ];

      blogRepository.find = jest.fn().mockResolvedValue(mockBlogs);

      const result = await service.getBlogs(getBlogsQueries);

      expect(result).toEqual(mockBlogs);
    });

    it('should return empty array if no blogs found', async () => {
      const getBlogsQueries: GetAllBlogsQueries = {
        page: '1',
        rowsPerPage: '10',
        order: 'ASC',
      };

      blogRepository.find = jest.fn().mockResolvedValue([]);

      const result = await service.getBlogs(getBlogsQueries);

      expect(result).toEqual([]);
    });

    it('should return page 2 of blogs', async () => {
      const getBlogsQueries: GetAllBlogsQueries = {
        page: '2',
        rowsPerPage: '2',
        order: 'ASC',
      };
      const mockBlogs: BLogEntity[] = [
        new BLogEntity(),
        new BLogEntity(),
        new BLogEntity(),
      ];

      blogRepository.find = jest.fn().mockResolvedValue([mockBlogs[2]]);

      const result = await service.getBlogs(getBlogsQueries);

      expect(result).toEqual([mockBlogs[2]]);
    });
  });

  it('should throw error when searching for a blog', async () => {
    const blogId = '100';
    blogRepository.findOne = jest.fn().mockRejectedValue(new Error('Error'));

    try {
      await service.getBlog(blogId);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should throw error when searching for all the blogs', async () => {
    const getBlogsQueries: GetAllBlogsQueries = {
      page: '1',
      rowsPerPage: '10',
      order: 'ASC',
    };

    blogRepository.find = jest.fn().mockRejectedValue(new Error('Error'));

    try {
      await service.getBlogs(getBlogsQueries);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should throw error when creating a new blog', async () => {
    const newBlog: CreateBlog = {
      title: 'New Blog',
      body: 'Blog Content',
    };

    blogRepository.save = jest.fn().mockRejectedValue(new Error('Error'));

    try {
      await service.createBlog(newBlog);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
