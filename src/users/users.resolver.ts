import { UsersService } from './users.service';
import { User } from './entities/User';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UsersResolver {

    constructor(private readonly usersService: UsersService){}

    @Query(returns => [User])
    users(): Promise<User[]>{
        return this.usersService.findAll()
    }
 
}
