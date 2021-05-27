import { Field, InputType } from "type-graphql";

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
