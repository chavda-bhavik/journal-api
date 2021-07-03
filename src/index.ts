import "reflect-metadata";
import express from 'express'
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { createConnection, getConnectionOptions } from "typeorm";
import { createSchema } from "./util/createSchema";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { COOKIE_NAME, __prod__ } from "./constants";

const main = async () => {
    const options = await getConnectionOptions(
        process.env.NODE_ENV || "development"
    );
    await createConnection({ ...options, name: "default" });
    
    const app = express();
    app.use(
        cors({
            origin: "*",
            credentials: true,
        })
    );

    let RedisStore = connectRedis(session);
    let redis = new Redis();
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax", // csrf
                secure: __prod__, // cookie only works in https
            },
            secret: "awerzjxerlkhqwilejhrjklasehriluh",
            resave: false,
            saveUninitialized: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await createSchema(),
        context: ({ req, res }) => ({
            req,
            res
        }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(4000, () => {
        console.log(`Server running on port 4000`);
    });
}

main().catch(err => {
    console.log(err);
});