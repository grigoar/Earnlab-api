import { Module } from '@nestjs/common';
import { BlogsController } from './controllers/blogs.controller';
import { BlogsService } from './services/blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BLogEntity } from '../database/entities/blog.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    TypeOrmModule.forFeature([BLogEntity]),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      }),
    }),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService],
})
export class BlogsModule {}
