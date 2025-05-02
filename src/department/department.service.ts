import { Injectable } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}
  async create(createDepartmentInput: CreateDepartmentInput) {
    return await this.prisma.department.create({
      data: {
        name: createDepartmentInput.name,
        subDepartments: createDepartmentInput?.subDepartments?.length
          ? {
              create: createDepartmentInput.subDepartments.map((sub) => ({
                name: sub.name,
              })),
            }
          : undefined,
      },
      include: {
        subDepartments: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.department.findMany({
      include: {
        subDepartments: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.department.findUnique({ where: { id } });
  }

  async update(id: number, updateDepartmentInput: UpdateDepartmentInput) {
    return await this.prisma.department.update({
      where: { id },
      data: { name: updateDepartmentInput.name },
    });
  }

  async remove(id: number) {
    return await this.prisma.department.delete({ where: { id } });
  }
}
