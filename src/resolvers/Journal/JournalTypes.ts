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

    @Field( () => Int, { nullable: true  })
    status: number;
}

@ObjectType()
export class FormattedJournalOutput {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    date: Date;

    @Field(() => String)
    title: String;

    @Field(() => String, { nullable: true })
    text: String;
}

@ObjectType()
export class AllJournalsOutput {
    @Field(() => Int)
    id: Number;

    @Field(() => String)
    date: Date;

    @Field(() => String, { nullable: true })
    actions: string;

    @Field(() => String, { nullable: true })
    greatfullness: string;

    @Field(() => String, { nullable: true })
    affirmation: string;

    @Field(() => String, { nullable: true })
    highlights: string;

    @Field(() => String, { nullable: true })
    improvements: string;
}