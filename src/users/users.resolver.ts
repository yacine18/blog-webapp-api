import { CreateUserInput } from './dto/input/create-user.input';
import { UsersService } from './users.service';
import { User } from './entities/User';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(returns => User)
  register(@Args('input') userInput:CreateUserInput): Promise<User> {
    return this.usersService.createUser(userInput);
  }
}
