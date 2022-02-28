import Ctx from 'src/types/context.type';
import { LoginUserInput } from './dto/input/login-user.input';
import { CreateUserInput } from './dto/input/create-user.input';
import { UsersService } from './users.service';
import { User } from './entities/User';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(returns => User)
  register(@Args('input') userInput:CreateUserInput) {
    return this.usersService.createUser(userInput);
  }

  @Query(() => User, {nullable:true})
  login(@Args('loginInput') loginInput:LoginUserInput, @Context() context:Ctx) {
     return this.usersService.login(loginInput, context)
  }

  @Query(() => User, {nullable:true})
  me(@Context() context:Ctx) {
    return context.req.user
  }
}
