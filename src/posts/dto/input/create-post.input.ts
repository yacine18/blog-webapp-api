import { Field, InputType } from "@nestjs/graphql"


@InputType()
export class CreatePostInput {

    @Field()
    postId: string

    @Field()
    title:string

    @Field()
    description:string

    @Field()
    image?: string
}