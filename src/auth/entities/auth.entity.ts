import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => Int)
  id: number;
  @Field()
  username: string;

  password: string;
}

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;
  @Field()
  username: string;

  password: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
export class LoginInput extends CreateUserInput {}

@ObjectType()
export class LoginResponse {
  @Field()
  status: 'success' | 'failed';
  @Field()
  message: string;
  @Field()
  user?: User;
  @Field()
  accessToken?: string;
}
