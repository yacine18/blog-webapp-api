import { Post } from './../../posts/entities/Post';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ObjectType, Field } from "@nestjs/graphql"
import {IsEmail, IsNotEmpty, Validate} from 'class-validator'

@Entity({name:"users"})
@ObjectType()
export class User {
    [x: string]: any;

    @PrimaryGeneratedColumn()
    @Field()
    id: number;
  
    @Column()
    @Field()
    @IsNotEmpty()
    name: string;
  
    @Column()
    @Field()
    @IsEmail()
    @IsNotEmpty()
    @Validate(Unique)
    email: string;
    
    @Column()
    @Field()
    @IsNotEmpty()
    password: string;

    @OneToMany(() => Post, post => post.user)
    @JoinColumn()
    posts: Post[]
  }