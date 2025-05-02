import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department, SubDepartment } from './entities/department.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Department, SubDepartment])],
  providers: [DepartmentResolver, DepartmentService, Repository],
})
export class DepartmentModule {}
