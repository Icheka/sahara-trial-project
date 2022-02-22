import { EmailValidationSchema } from "../../helpers/joi";
import joi from "joi";
import { Gender } from "../../types/models";

const requiredString = joi.string().required();
const requiredNumber = joi.number().required();

export const CustomerValidations = {
    NewCustomer: joi.object({
        firstName: requiredString,
        lastName: requiredString,
        email: EmailValidationSchema.required(),
        country: requiredString,
        password: requiredString.min(6),
        gender: requiredString.valid(...Object.values(Gender)),
        dob: requiredNumber,
        ethnicity: requiredString,
        height: requiredNumber,
        weight: requiredNumber,
        familyHistory: joi.object({
            cardiovascular: joi.string().optional(),
            colorectalCancer: joi.string().optional(),
            gerd: joi.string().optional(),
            ibd: joi.string().optional(),
            nash: joi.string().optional(),
            t2dm: joi.string().optional(),
        }),
    }),
};
