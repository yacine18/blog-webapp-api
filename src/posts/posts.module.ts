import { Post } from './entities/Post';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Module } from '@nestjs/common';


@Module({
    imports:[TypeOrmModule.forFeature([Post])],
    providers:[PostsResolver, PostsService]
})
export class PostsModule {

}