import { CreateUserInput } from './create-auth.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: string;
}
