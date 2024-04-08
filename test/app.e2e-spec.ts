import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/blogs (GET)', () => {
    const newBlog = {
      title: 'New Blog',
      body: 'Blog Content',
    };
    return request(app.getHttpServer())
      .post('/blogs')
      .send(newBlog)
      .expect(201)
      .expect(`{"message":"Blog Created Successfully"}`);
  });

  it('/blogs (GET)', () => {
    return request(app.getHttpServer()).get('/blogs').expect(200);
  });

  it('/blogs/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/blogs/1d79afc7-2e83-4736-8363-8d75f4b0cc27')
      .expect(200);
  });
});
