import { CreateDepartmentInput } from './create-department.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => Int)
  id: number;

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
