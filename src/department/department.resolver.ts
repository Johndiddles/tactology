import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department, SubDepartment } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import {
  UpdateDepartmentInput,
  UpdateSubDepartmentInput,
} from './dto/update-department.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeleteDepartmentResponse } from './dto/delete-department-response';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => Department)
  @UseGuards(AuthGuard)
  createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentService.create(createDepartmentInput);
  }

  @Query(() => [Department], { name: 'departments' })
  @UseGuards(AuthGuard)
  findAll() {
    return this.departmentService.findAllDepartments();
  }

  @Query(() => Department, { name: 'department' })
  @UseGuards(AuthGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.departmentService.findDepartment(id);
  }

  @Mutation(() => Department)
  @UseGuards(AuthGuard)
  updateDepartment(
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    return this.departmentService.updateDepartment(
      updateDepartmentInput.id,
      updateDepartmentInput,
    );
  }

  @Mutation(() => DeleteDepartmentResponse)
  @UseGuards(AuthGuard)
  removeDepartment(@Args('id', { type: () => ID }) id: string) {
    return this.departmentService.deleteDepartment(id);
  }

  //* SUB DEPARTMENTS - READ | UPDATE | DELETE */
  @Query(() => [SubDepartment], { name: 'subDepartments' })
  @UseGuards(AuthGuard)
  findAllSubDepartments() {
    return this.departmentService.findAllSubDepartments();
  }

  @Query(() => SubDepartment, { name: 'subDepartment' })
  @UseGuards(AuthGuard)
  findSubDepartment(@Args('id', { type: () => ID }) id: string) {
    return this.departmentService.findSubDepartment(id);
  }

  @Mutation(() => SubDepartment)
  @UseGuards(AuthGuard)
  updateSubDepartment(
    @Args('updateSubDepartmentInput')
    updateSubDepartmentInput: UpdateSubDepartmentInput,
  ) {
    return this.departmentService.updateSubDepartment(
      updateSubDepartmentInput.id,
      updateSubDepartmentInput,
    );
  }

  @Mutation(() => DeleteDepartmentResponse)
  @UseGuards(AuthGuard)
  removeSubDepartment(@Args('id', { type: () => ID }) id: string) {
    return this.departmentService.deleteSubDepartment(id);
  }
}
