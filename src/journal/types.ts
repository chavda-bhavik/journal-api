import { Request, Response } from "express";
interface sessionStore {
    userId?: number;
}
export type MyContext = {
    req: Request & { session: sessionStore };
    res: Response;
};
