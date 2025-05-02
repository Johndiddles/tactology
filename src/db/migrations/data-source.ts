import 'dotenv/config';
import { User } from 'src/auth/entities/auth.entity';
import {
  Department,
  SubDepartment,
} from 'src/department/entities/department.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

const config = {
  type: 'postgres',
  url: process.env.DATABASE_URL, // or use host, port, username, etc.
  entities: [Department, SubDepartment, User],
  migrations: ['dist/db/migrations/*.ts'],
  synchronize: process.env.SYNCHRONIZE_DB === 'true',
};
export default registerAs('typeorm', () => config);
export const AppDataSource = new DataSource(config as DataSourceOptions);
