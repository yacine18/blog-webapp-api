import { UpdatePostInput } from './dto/input/update-post.input';
import { CreatePostInput } from './dto/input/create-post.input';
import { Post } from './entities/Post';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async createPost(createPostInput: CreatePostInput): Promise<Post> {
    const newPost = this.postsRepository.create(createPostInput);

    return this.postsRepository.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    return await this.postsRepository.findOne(id);
  }

  async updateOne(id: number, updatePostInput: UpdatePostInput): Promise<Post> {
    const post = await this.postsRepository.findOne(id);
    if (post) {
      await this.postsRepository.update({ id }, updatePostInput);
    }

    return post;
  }

  delete(id: number) {
    return this.postsRepository.delete(id);
  }
}
