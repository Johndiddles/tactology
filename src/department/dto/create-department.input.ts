import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, Length, ValidateNested } from 'class-validator';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @Length(2, 50, {
    message: 'Department name must be between 2 and 50 characters',
  })
  name: string;

  @Field(() => [CreateSubDepartmentInput], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => CreateSubDepartmentInput)
  @IsOptional()
  subDepartments?: CreateSubDepartmentInput[];
}

@InputType()
export class CreateSubDepartmentInput {
  @Field()
  @Length(2, 50, {
    message: 'Sub Department name must be between 2 and 50 characters',
  })
  name: string;
}
