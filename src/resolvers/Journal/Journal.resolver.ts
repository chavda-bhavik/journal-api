import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Journal } from "../../entities/Journal";
import { GetLastFirstDates } from "./GetLastFirstDates";
import { JournalInput, GetAllJournalOutput } from "./JournalTypes";
import { getConnection } from "typeorm";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

let titles: Partial<Journal> = {
    "affirmation": "YOUR DAILY AFFIRMATION",
    "greatfullness": "WHAT I WAS GREATEFUL FOR"
}

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
    
    @Query( () => [GetAllJournalOutput])
    async getAllJournals(
        @Arg('monthDate', { nullable: true }) monthDate?: Date
    ): Promise<GetAllJournalOutput[]> {
        let dates;
        if(monthDate) {
            dates = GetLastFirstDates(monthDate.getTime());
        } else {
            dates = GetLastFirstDates();
        }
        let { firstDay, lastDay } = dates;

        let query = await getConnection()
                .createQueryBuilder()
                .select([ "entities.id", "entities.greatfullness", "entities.affirmation", "entities.date" ])
                .from(Journal, "entities")
                .where('"entities"."date" BETWEEN :startDate and :endDate', { startDate: firstDay, endDate: lastDay });
        
        let result = await query.getMany(), journalObj:GetAllJournalOutput, text, title;
        
        let output:GetAllJournalOutput[] = result.map( (journal, index) => {
            // taking greatfullness for every 3rd day
            if(index % 3 === 0) {
                text = journal.greatfullness;
                title = titles.greatfullness!;
            } else {
                text = journal.affirmation;
                title = titles.affirmation!;
            }
            
            journalObj = {
                id: journal.id,
                date: journal.date,
                title: title,
                text: text
            }
            return journalObj;
        })

        return output;
    }
}