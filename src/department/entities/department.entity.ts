import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Department {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [SubDepartment])
  subDepartments: SubDepartment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class SubDepartment {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
