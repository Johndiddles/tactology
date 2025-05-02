import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput, LoginInput } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async validateUser(payload: LoginInput) {
    const user = await this.prisma.user.findUnique({
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
    return await this.prisma.user.create({ data: createUserInput });
  }

  login(user: { id: number; username: string }) {
    const payload = { sub: user.id, username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
