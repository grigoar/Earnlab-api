import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { BLogEntity } from './entities/blog.entity';

dotenv.config();

const dbConfig: () => DataSourceOptions = () => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [BLogEntity],
    subscribers: [],
    migrationsRun: true,
  };
};

export default dbConfig;
