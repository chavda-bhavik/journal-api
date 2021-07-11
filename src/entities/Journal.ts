import { Field, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";

@ObjectType()
@Entity()
export class Journal extends BaseEntity {
    @Field()
    @PrimaryColumn("uuid", { unique: true })
    id!: string;

    @Field({ nullable: true })
    @Column({ nullable: true, type: "text" })
    actions!: string;

    @Field({ nullable: true })
    @Column({ nullable: true, type: "text" })
    greatfullness!: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    affirmation!: string;

    @Field({ nullable: true })
    @Column({ nullable: true, type: "text" })
    highlights!: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    improvements!: string;

    @Field(() => String)
    @Column({ type: Date, default: new Date(), unique: true })
    date: Date;

    @Field(() => Int)
    @Column({ type: Number, default: 0 })
    status: Number;

    @Field(() => String, { nullable: true })
    @Column({ type: "text", nullable: true })
    image: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}