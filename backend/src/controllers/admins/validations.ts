import { EmailValidationSchema } from "../../helpers/joi";
import joi from "joi";

const requiredString = joi.string().required();

export const AdminValidations = {
    Login: joi.object({
        email: EmailValidationSchema.required(),
        password: requiredString.min(6),
    }),
};
