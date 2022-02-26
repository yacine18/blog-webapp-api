import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from "@nestjs/graphql"

@Entity({name:"users"})
@ObjectType()
export class User {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;
  
    @Column()
    @Field()
    name: string;
  
    @Column()
    @Field()
    email: string;
    
    @Column()
    @Field()
    password: string;
  }