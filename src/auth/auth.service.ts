import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from './dto/create-auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly authRepo: Repository<User>,
  ) {}

  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async validateUser(payload: LoginInput) {
    const user = await this.authRepo.findOne({
      where: { username: payload.username },
    });
    if (!user) throw new Error('Invalid credentials');

    const passwordValid = await this.comparePasswords(
      payload.password,
      user.password,
    );
    if (!passwordValid) throw new Error('Invalid credentials');

    return user;
  }

  async create(createUserInput: CreateUserInput) {
    const user = this.authRepo.create(createUserInput);
    await this.authRepo.save(user);
    return user;
  }

  login(user: User) {
    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
