import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@Entity({name:"posts"})
@ObjectType()
export class Post {

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  @IsNotEmpty({message:"Title Shouldn't be empty"})
  title: string;

  @Column()
  @Field()
  @IsNotEmpty()
  description: string;

  @Column()
  @Field({nullable:true})
  image?:string;

}
