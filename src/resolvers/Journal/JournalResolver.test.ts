import { Connection } from "typeorm";
import { Journal } from "../../entities/Journal";
import { testConn } from "../../test-util/testConn";
import faker from 'faker'
import { gCall } from "../../test-util/gCall";

let conn:Connection;
beforeAll(async () => {
    conn = await testConn();
});
afterAll(async () => {
    await conn.close();
});

const journalMutationQuery = `
    mutation journal(
        $date:DateTime!, 
        $actions:String, 
        $greatfullness:String,
        $affirmations:String,
        $highlights:String,
        $improvements:String
    ) {
        journal(values: {
            date: $date,
            actions: $actions,
            greatfullness: $greatfullness,
            affirmation: $affirmations,
            highlights: $highlights,
            improvements: $improvements
        }) {
            actions
            affirmation
        }
    }
`
const allJournalsQuery = `
    query {
        getAllJournals {
            id
            actions
            greatfullness
            affirmation
            highlights
            improvements
            date
        }
    }
`
const getSingleJournal = `
    query journal($date:DateTime) {
        journal(date: $date) {
            actions
        }
    }
`


describe('journal operations', () => {
    let date:any = "01/22/2021";
    const journal:Partial<Journal> = {
        date,
        actions: faker.internet.userName(),
    };

    it('should create new journal entry', async () => {
        let response = await gCall({
            source: journalMutationQuery,
            variableValues: journal
        });
        expect(response).toMatchObject({
            data: {
                journal: {
                    actions: journal.actions,
                    affirmation: null
                }
            }
        });
    });
    it('should get all journal entries', async () => {
        let response = await gCall({
            source: allJournalsQuery
        });
        expect(response && response?.data?.getAllJournals.length).toBeGreaterThan(0);
    });
    it('should get single journal', async () => {
        let response = await gCall({
            source: getSingleJournal,
            variableValues: {
                date: date
            }
        });
        expect(response).toMatchObject({
            data: {
                journal: {
                    actions: journal.actions
                }
            }
        });
    });
    it("should not get wrong journal", async () => {
        let response = await gCall({
            source: getSingleJournal,
            variableValues: {
                date: "01/01/2021"
            }
        });
        expect(response?.data).toBeNull();
    });
})