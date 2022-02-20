import { EmailValidationSchema } from "../../helpers/joi";
import joi from "joi";

const requiredString = joi.string().required();

export const CustomerValidations = {
    NewCustomer: joi.object({
        firstName: requiredString,
        lastName: requiredString,
        email: EmailValidationSchema.required(),
        country: requiredString,
        password: requiredString.min(6),
    }),
};
