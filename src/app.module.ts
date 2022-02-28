import { decode } from './utils/jwt.utils';
import { ConfigModule } from '@nestjs/config';
import { Post } from './posts/entities/Post';
import { User } from './users/entities/User';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { get, set } from 'lodash';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestjs-blog',
      entities: [User, Post],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
      context: ({ req, res }) => {
        // Get the cookie from request
        const token = get(req, 'cookies.token');

        console.log({ token });
        // Verify the cookie

        const user = token ? decode(get(req, 'cookies.token')) : null;

        // Attach the user object to the request object
        if (user) {
          set(req, 'user', user);
        }

        return { req, res };
      },
    }),
    UsersModule,
    PostsModule,
  ],
  providers: [],
})
export class AppModule {}
