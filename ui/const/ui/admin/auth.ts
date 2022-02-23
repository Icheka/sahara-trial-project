import * as Yup from 'yup';
import { yupRequiredString } from '../formik/validation';

export const adminAuthForms = {
    signin: {
        validations: Yup.object({
            email: yupRequiredString.email('Please, enter a valid email address'),
            password: yupRequiredString,
        }),
    },
};
