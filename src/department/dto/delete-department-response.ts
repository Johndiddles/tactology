import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class DeleteDepartmentResponse {
  @Field()
  message: string;

  @Field()
  status: 'success' | 'failed';

  @Field(() => ID)
  id: string;
}
