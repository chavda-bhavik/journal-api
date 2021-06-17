import { Field, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@ObjectType()
@Entity()
export class Journal extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

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
    @Column({ type: Date, default: new Date() })
    date: Date;

    @Field(() => Int)
    @Column({ type: Number, default: 0 })
    status: Number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}