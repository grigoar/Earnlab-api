# Earnlab - Api

Develop a simplified RESTful API service for managing blog posts using NestJS, TypeORM/Postgres, and Redis. The focus will be on creating and reading blog posts, with Redis caching to enhance read performance.

## Endpoints created

- (POST){url}/blogs Create Blog post : It needs a body(title, body) and it will create a new entry in the database(id, title, body, created_at, updated_at) and it will return a simple message that state that the blog was created. This endpoint is also cached using Redis cache to increase the endpoint performance.
- (GET){url}/blogs/{blogID} Get Blog Post by id: It needs a blog ID for the param and it will return an blog entry(id, title, body, created_at, updated_at) from the database with that ID.
- (GET){url}/blogs Get Blog Posts (paginated with the queries: page, rowsPerPage, order). The queries are optional

## To run the project

- The .env variables needs to be set. An example of .env file variables are:
  DB_USER='postgre_user'
  DB_HOST='localhost'
  DB_NAME='db_name'
  DB_PASSWORD='some_password'
  DB_PORT=5432
  REDIS_HOST='localhost'
  REDIS_PORT=6379
- Have the redis-server installed on the computer
- Have a postgreSQL database created with the name set in the .env file(ex. POSTGRES_DB=earnlab_db)
- install all the packages with "npm i"
- make sure the redis-server is running (redis-server command)
- start the application using "npm run start:dev"
