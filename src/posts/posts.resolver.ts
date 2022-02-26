import { UpdatePostInput } from './dto/input/update-post.input';
import { CreatePostInput } from './dto/input/create-post.input';
import { PostsService } from './posts.service';
import { Post } from './entities/Post';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';

@Resolver(() => Post)
export class PostsResolver {

    constructor(private readonly postsService: PostsService){}

    @Query(() => Post)
    getPost(@Args('id', {type: () => Int}) id:number): Promise<Post>{
        return this.postsService.findOne(id)
    }
 
    @Query(returns => [Post])
    async posts(): Promise<Post[]> {
        return this.postsService.findAll()
    }

    @Mutation(returns => Post)
    createPost(@Args('createPostInput') createPostInput:CreatePostInput): Promise<Post> {
        return this.postsService.createPost(createPostInput)
    }

    @Mutation(returns => Post)
    update(@Args('updatePostInput') id:number, updatePostInput:UpdatePostInput): Promise<Post>{
        return this.postsService.updateOne(id, updatePostInput)
    }

    @Mutation(returns => Post)
    deletePost(@Args('id', {type: () => Int}) id:number){
         this.postsService.delete(id)
         return id
    }
}
