import { buildSchema } from "type-graphql";
import { HelloResolver } from "../resolvers/hello";
import { UserResolver } from "../resolvers/User/User.resolver";

export const createSchema = async () => {
    return await buildSchema({
        resolvers: [
            HelloResolver,
            UserResolver
        ],
        validate: false,
        dateScalarMode: "isoDate",
    });
};
