import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class UpdatePostInput {

    @Field()
    title?:string

    @Field()
    description?:string

    @Field()
    image?: string
}