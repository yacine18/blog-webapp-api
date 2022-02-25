import { User } from './models/User';
import { Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UsersResolver {
 
}
