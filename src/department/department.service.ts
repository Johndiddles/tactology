import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
  ) {}
  create(createDepartmentInput: CreateDepartmentInput) {
    const deparment = this.departmentRepo.create({
      name: createDepartmentInput.name,
      subDepartments: createDepartmentInput?.subDepartments?.length
        ? createDepartmentInput.subDepartments.map((sub) => ({
            name: sub.name,
          }))
        : undefined,
    });

    return this.departmentRepo.save(deparment);
  }

  async findAll() {
    return await this.departmentRepo.find({
      relations: ['subDepartments'],
    });
  }

  async findOne(id: string) {
    return await this.departmentRepo.findOne({ where: { id } });
  }

  async update(id: string, updateDepartmentInput: UpdateDepartmentInput) {
    const departmentToUpdate = await this.departmentRepo.findOne({
      where: { id: id },
      relations: ['subDepartments'],
    });

    if (!departmentToUpdate) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    await this.departmentRepo.save({
      ...departmentToUpdate,
      updateDepartmentInput,
    });
  }

  async remove(id: string) {
    return await this.departmentRepo.delete({ id });
  }
}
