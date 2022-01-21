import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class User {
  @Field()
  id: number;

  @Field()
  username: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}