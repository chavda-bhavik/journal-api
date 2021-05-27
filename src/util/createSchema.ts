import { buildSchema } from "type-graphql";
import { HelloResolver } from "../resolvers/hello";
import { UserResolver } from "../resolvers/User/User.resolver";
import { JournalResolver } from '../resolvers/Journal/Journal.resolver'

export const createSchema = async () => {
    return await buildSchema({
        resolvers: [
            HelloResolver,
            UserResolver,
            JournalResolver
        ],
        validate: false,
        dateScalarMode: "isoDate",
    });
};
