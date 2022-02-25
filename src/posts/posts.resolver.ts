import { Post } from './models/Post';
import { Resolver } from '@nestjs/graphql';

@Resolver(() => Post)
export class PostsResolver {
 
}
