import { FieldError } from "../resolvers/FieldError";
import { UsernamePasswordInput } from "../resolvers/shared/UsernamePasswordInput";

export const validateRegister = (
    options: UsernamePasswordInput
): FieldError[] => {
    if (!options.email.includes("@")) {
        // mail length error
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }
    if (options.username.length <= 3) {
        // username length error
        return [
            {
                field: "username",
                message: "length must be greater than 3",
            },
        ];
    }
    if (options.password.length <= 3) {
        // password length error
        return [
            {
                field: "password",
                message: "length must be greater than 3",
            },
        ];
    }
    return [];
};
