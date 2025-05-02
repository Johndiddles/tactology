import { PrimaryGeneratedColumn } from 'typeorm';
import { CreateDepartmentInput } from './create-department.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  name: string;

  @Field(() => [UpdateSubDepartmentInput], { nullable: true })
  subDepartments?: UpdateSubDepartmentInput[];
}

@InputType()
export class UpdateSubDepartmentInput {
  @Field()
  name: string;
}
