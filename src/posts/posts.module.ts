import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Module } from '@nestjs/common';


@Module({
    providers:[PostsResolver, PostsService]
})
export class UsersModule {

}