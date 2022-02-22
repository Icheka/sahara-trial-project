import { FormikProps } from 'formik';
import { FunctionComponent, Props } from 'react';
import { TextFieldLabelText } from './LabelText';
import { TextField } from './TextField';

export interface IInputField {
    label: string;
    formik?: FormikProps<any>;
    title?: string;
    autoComplete?: string;
    type?: string;
    placeholder?: string;
    className?: string;
    error?: string | false;
}

export const InputField: FunctionComponent<IInputField> = ({
    formik,
    label,
    title,
    children,
    autoComplete,
    type = 'text',
    placeholder,
    className = 'mt-1',
    error,
}) => {
    return (
        <div className={`w-full`}>
            <div className={`${className}`}>
                {children ? (
                    <>
                        <TextFieldLabelText id={title}>{label}</TextFieldLabelText>
                        {children}
                    </>
                ) : (
                    <TextField
                        id={title}
                        type={type}
                        label={label}
                        required
                        additionalInputProps={formik && formik.getFieldProps(title)}
                        error={
                            (error && error) ??
                            // silence TS warning about familyHistory object
                            (formik &&
                                title &&
                                (formik.errors[title] as any) &&
                                formik.touched[title] &&
                                formik.errors[title])
                        }
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                    />
                )}
            </div>
        </div>
    );
};
