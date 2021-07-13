import { buildSchema } from "type-graphql";
import { JournalResolver } from '../resolvers/Journal/Journal.resolver'

export const createSchema = async () => {
    return await buildSchema({
        resolvers: [
            JournalResolver
        ],
        validate: false,
        dateScalarMode: "isoDate",
    });
};
