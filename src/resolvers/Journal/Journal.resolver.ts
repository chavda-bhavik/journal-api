import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Journal } from "../../entities/Journal";
import { JournalInput } from "./JournalInput";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

@Resolver()
export class JournalResolver {
    @Mutation( () => Journal || null)
    async journal(
        @Arg('values') values: JournalInput
    ): Promise<Journal | undefined> {
        let journal = await Journal.findOne({ where: { date: values.date }});
        let newJournal:Journal;
        if(journal) {
            // edit journal
            let editValues:PartialBy<JournalInput, 'date'> = { ...values };
            delete editValues?.date;
            Object.assign(journal, editValues);
            newJournal = await journal.save();
        } else {
            // create journal
            newJournal = await Journal.create(values);
            await newJournal.save();
        }
        return newJournal;
    }

    @Query( () => Journal, { name: "journal" })
    async getJournal(
        @Arg('date', { nullable: true }) date: Date,
        @Arg('id', () => Int, { nullable: true }) id:number
    ): Promise<Journal> {
        if(!date && !id) {
            throw new Error("Either journal date or id is required!")
        }
        let journal:Journal | undefined;
        if(date) {
            journal = await Journal.findOne({ date });   
            if(journal) return journal;
        }
        journal = await Journal.findOne({ id });
        if(!journal) throw new Error('Journal not found');
        return journal
    }
    
    @Query( () => [Journal])
    async getAllJournals(): Promise<Journal[]> {
        return Journal.find();
    }
}