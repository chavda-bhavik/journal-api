import { User } from "../../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UsernamePasswordInput } from "../shared/UsernamePasswordInput";
import { MyContext } from "../../types";
import argon2 from "argon2";
import * as Yup from "yup";
import { UserResponse } from "./UserResponse";
import {
    emailExists,
    emailNotLongEnough,
    invalidEmail,
    passwordNotLongEnough,
    passwordNotValid,
    usernameExists,
    usernameNotLongEnough,
} from "../shared/errorMessages";
import { formatYupError } from "../shared/formatYupError";
import { createErrorObj } from '../shared/createErrorObj'
import { COOKIE_NAME } from "../../constants";

const registerSchema = Yup.object().shape({
    email: Yup.string().min(3, emailNotLongEnough).max(255).email(invalidEmail),
    password: Yup.string().min(4, passwordNotLongEnough).max(255),
    username: Yup.string().min(4, usernameNotLongEnough).max(255),
});
const loginWithUsernameSchema = Yup.object().shape({
    usernameOrEmail: Yup.string().min(4, usernameNotLongEnough).max(255),
    password: Yup.string().min(4, passwordNotLongEnough).max(255)
});
const loginWithEmailSchema = Yup.object().shape({
    usernameOrEmail: Yup.string().email().min(3, emailNotLongEnough).max(255),
    password: Yup.string().min(4, passwordNotLongEnough).max(255)
});

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        try {
            await registerSchema.validate(options, { abortEarly: false });
        } catch (error) {
            return {
                errors: formatYupError(error),
            };
        }

        const hashedPassword = await argon2.hash(options.password);
        let user;
        try {
            user = await User.create({
                username: options.username,
                email: options.email,
                password: hashedPassword,
            }).save();
        } catch (error) {
            if (error.detail.includes("email")) {
                // duplicate email error
                return {
                    errors: [
                        createErrorObj("email", emailExists)
                    ],
                };
            } else if (error.detail.includes("username")) {
                // duplicate username error
                return {
                    errors: [
                        createErrorObj("username", usernameExists)
                    ],
                };
            }
        }

        req.session.userId = user?.id;
        return { user };
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: MyContext) {
        // you're not logged in
        if (!req.session.userId) {
            return null;
        }
        return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        try {
            let obj = { usernameOrEmail, password };
            if (usernameOrEmail.includes('@')) {
                await loginWithEmailSchema.validate(obj, { abortEarly: false });
            } else {
                await loginWithUsernameSchema.validate(obj, { abortEarly: false });
            }
        } catch (error) {
            return {
                errors: formatYupError(error),
            }
        }
        let user = await User.findOne({
            where: usernameOrEmail.includes("@")
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail },
        });
        if (!user) {
            return {
                errors: [
                    createErrorObj("usernameOrEmail", `That Username Or Email doesn't exist`)
                ],
            };
        }
        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return {
                errors: [
                    createErrorObj("password", passwordNotValid)
                ],
            };
        }

        req.session.userId = user.id;
        return { user };
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { req, res }: MyContext) {
        return new Promise(resolve =>
            req.session.destroy( (err:any) => {
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            })
        );
    }
}
