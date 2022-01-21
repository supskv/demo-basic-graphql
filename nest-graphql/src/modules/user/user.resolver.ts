import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewUserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { User } from './models/user.model';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(returns => User)
    async user(@Args('id') id: number): Promise<User> {
      const user = await this.userService.findOneById(id);
      if (!user) {
        throw new NotFoundException(id);
      }
      return user;
    }

    @Query(returns => [User])
    users(@Args() usersArgs: UsersArgs): Promise<User[]> {
      return this.userService.findAll(usersArgs);
    }

    @Mutation(returns => User)
    async createUser(
      @Args('newUserData') newUserData: NewUserInput,
    ): Promise<User> {
      const user = await this.userService.create(newUserData);
      pubSub.publish('userCreated', { userCreated: user });
      return user;
    }
  
    @Mutation(returns => Boolean)
    async deleteUser(@Args('id') id: number) {
      return this.userService.remove(id);
    }

    @Subscription(returns => User)
    userCreated() {
      return pubSub.asyncIterator('userCreated');
    }
}
