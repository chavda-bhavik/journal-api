import "reflect-metadata";
import { graphql, GraphQLSchema } from "graphql"
import { Maybe } from "type-graphql"

import { createSchema } from "../util/createSchema";

interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
}

let schema:GraphQLSchema;

export const gCall = async ({ source, variableValues }:Options) => {
    if(!schema) {
        schema = await createSchema();
    }
    return graphql({
        schema: schema,
        source,
        variableValues
    })
}