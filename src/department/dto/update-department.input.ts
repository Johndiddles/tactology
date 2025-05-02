import { InputType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsUUID, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class UpdateDepartmentInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  @Length(2, 50, {
    message: 'Department name must be between 2 and 50 characters',
  })
  name: string;

  @Field(() => [UpdateDepartmentInput], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => UpdateDepartmentInput)
  @IsOptional()
  subDepartments?: UpdateSubDepartmentInput[];
}

@InputType()
export class UpdateSubDepartmentInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @Length(2, 50, {
    message: 'Sub Department name must be between 2 and 50 characters',
  })
  @IsOptional()
  name: string;
}
