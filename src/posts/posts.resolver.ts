import { Post } from './entities/Post';
import { Resolver } from '@nestjs/graphql';

@Resolver(() => Post)
export class PostsResolver {
 
}
