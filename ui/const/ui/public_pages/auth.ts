import * as Yup from 'yup';
import { yupNumber, yupString } from '../formik/validation';

const string = yupString;
const number = yupNumber;
const requiredString = string.required('This field cannot be blank');
const requiredNumber = number.required('This field cannot be blank');

const email = requiredString.email('This field must be a valid email address');
const password = requiredString.min(6, 'Password must be at least 6 characters long');
const firstName = requiredString;
const lastName = requiredString;
const country = requiredString;
const gender = requiredString;
const dob = number
    .required('Date of birth is required')
    .min(1, 'Date of birth is required');
const height = requiredNumber.min(2, 'Enter a valid height in centimetres');
const weight = requiredNumber.min(2, 'Enter a valid weight in kilogrammes');
const ethnicity = requiredString;
const familyHistory = Yup.object({
    cardiovascular: string,
    colorectalCancer: string,
    gerd: string,
    ibd: string,
    nash: string,
    t2dm: string,
});

export const customerAuthForms = {
    validations: {
        signUp: Yup.object({
            email,
            password,
            firstName,
            lastName,
            country,
            gender,
            dob,
            height,
            weight,
            ethnicity,
            familyHistory,
        }),
        signIn: Yup.object({
            email,
            password,
        }),
    },
};
