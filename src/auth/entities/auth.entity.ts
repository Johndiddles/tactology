import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  password: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  @Column()
  status: 'success' | 'failed';
  @Field()
  @Column()
  message: string;
  @Field()
  @Column()
  user?: User;
  @Field()
  @Column()
  accessToken?: string;
}
