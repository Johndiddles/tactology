import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-auth.input';
import { LoginInput } from './dto/login.input';
import { LoginResponse, User } from './entities/auth.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const hashedPassword = await this.authService.hashPassword(
      createUserInput.password,
    );

    const user = await this.authService.create({
      ...createUserInput,
      password: hashedPassword,
    });

    return user;
  }

  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    try {
      const user = await this.authService.validateUser(loginInput);

      const token = this.authService.login(user);
      return {
        status: 'success',
        message: 'Login successful',
        accessToken: token.accessToken,
        user,
      };
    } catch (error) {
      // console.log({ error, type: typeof error });

      throw new UnauthorizedException((error as { message: string })?.message);
    }
  }
}
