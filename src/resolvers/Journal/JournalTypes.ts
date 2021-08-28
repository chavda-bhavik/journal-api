import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Field, InputType, ObjectType, Int } from "type-graphql";

@InputType()
export class JournalInput {
    @Field()
    id: string;

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

    @Field(() => GraphQLUpload, { nullable: true })
    image: FileUpload | string;
}

export type TempJournal = {
    id: string;
    date: Date;
    actions: string;
    greatfullness: string;
    affirmation: string;
    highlights: string;
    improvements: string;
    status: number;
    image: string | FileUpload;
}

@ObjectType()
export class FormattedJournalOutput {
    @Field(() => String)
    id: string;

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