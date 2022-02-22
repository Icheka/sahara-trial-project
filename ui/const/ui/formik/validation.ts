import * as Yup from 'yup';

export const yupString = Yup.string();
export const yupNumber = Yup.number();
export const yupRequiredString = yupString.required('This field cannot be blank');
export const yupRequiredNumber = yupNumber.required('This field cannot be blank');
