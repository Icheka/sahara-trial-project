import * as Yup from 'yup';

const email = Yup.string().email().required('This field cannot be blank');
const password = Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('This field cannot be blank');

export const customerAuthForms = {
    validations: {
        signIn: Yup.object({
            email,
            password,
        }),
    },
};
