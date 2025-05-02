import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import {
  UpdateDepartmentInput,
  UpdateSubDepartmentInput,
} from './dto/update-department.input';
import { Repository } from 'typeorm';
import { Department, SubDepartment } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UpdateSubDepartmentInput } from './dto/update-subdepartment.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentRepo: Repository<SubDepartment>,
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

  async findAllDepartments() {
    return await this.departmentRepo.find({
      relations: ['subDepartments'],
    });
  }

  async findDepartment(id: string) {
    return await this.departmentRepo.findOne({ where: { id } });
  }

  async updateDepartment(
    id: string,
    updateDepartmentInput: UpdateDepartmentInput,
  ) {
    const departmentToUpdate = await this.departmentRepo.findOne({
      where: { id: id },
      relations: ['subDepartments'],
    });

    if (!departmentToUpdate) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    if (updateDepartmentInput.name) {
      departmentToUpdate.name = updateDepartmentInput.name;
    }

    if (updateDepartmentInput.subDepartments) {
      for (const subInput of updateDepartmentInput.subDepartments) {
        const existing = departmentToUpdate.subDepartments.find(
          (sd) => sd.id === subInput.id,
        );

        if (existing) {
          if (subInput.name) existing.name = subInput.name;
        } else {
          const nameExists = departmentToUpdate.subDepartments.some(
            (sd) => sd.name.toLowerCase() === subInput.name.toLowerCase(),
          );

          console.log({ nameExists, name: subInput.name });

          if (!nameExists) {
            const newSub = this.subDepartmentRepo.create({
              id: subInput.id,
              name: subInput.name,
              department: departmentToUpdate,
            });
            departmentToUpdate.subDepartments.push(newSub);
          }
        }
      }
    }

    const updatedDepartment =
      await this.departmentRepo.save(departmentToUpdate);

    return updatedDepartment;
  }

  async deleteDepartment(id: string) {
    const result = await this.departmentRepo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    await this.departmentRepo.remove(result);
    return {
      status: 'success',
      message: 'Department deleted successfully',
      id: id,
    };
  }

  //* SUB DEPARTMENTS - READ | UPDATE | DELETE */
  async findAllSubDepartments() {
    return await this.subDepartmentRepo.find();
  }

  async findSubDepartment(id: string) {
    return await this.subDepartmentRepo.findOne({ where: { id } });
  }

  async updateSubDepartment(
    id: string,
    updateDepartmentInput: UpdateSubDepartmentInput,
  ) {
    const departmentToUpdate = await this.subDepartmentRepo.findOne({
      where: { id: id },
    });

    if (!departmentToUpdate) {
      throw new NotFoundException(`Sub Department with ID ${id} not found`);
    }

    departmentToUpdate.name = updateDepartmentInput.name;

    const updatedDepartment =
      await this.subDepartmentRepo.save(departmentToUpdate);

    return updatedDepartment;
  }

  async deleteSubDepartment(id: string) {
    const result = await this.subDepartmentRepo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException(`Sub Department with ID ${id} not found`);
    }
    await this.subDepartmentRepo.remove(result);
    return {
      status: 'success',
      message: 'Sub Department deleted successfully',
      id: id,
    };
  }
}
