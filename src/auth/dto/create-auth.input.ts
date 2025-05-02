import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @Length(2, 50, {
    message: 'Username must be between 2 and 50 characters',
  })
  username: string;

  @Field()
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  password: string;
}
