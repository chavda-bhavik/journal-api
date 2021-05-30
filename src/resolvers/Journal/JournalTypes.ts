import { Field, InputType, ObjectType, Int } from "type-graphql";

@InputType()
export class JournalInput {
    @Field()
    date: Date;

    @Field({ nullable: true })
    actions: string;

    @Field({ nullable: true })
    greatfullness: string;

    @Field({ nullable: true })
    affirmation: string;

    @Field({ nullable: true })

    highlights: string;

    @Field({ nullable: true })
    improvements: string;
}

@ObjectType()
export class GetAllJournalOutput {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    date: Date;

    @Field(() => String)
    title: String;

    @Field(() => String, { nullable: true })
    text: String;
}