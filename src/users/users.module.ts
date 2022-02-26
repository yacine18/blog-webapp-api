import { User } from './entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Module } from '@nestjs/common';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers:[UsersResolver, UsersService]
})
export class UsersModule {

}