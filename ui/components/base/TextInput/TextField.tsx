import { DetailedHTMLProps, FunctionComponent, InputHTMLAttributes } from 'react';
import { TextFieldError } from './ErrorText';
import { TextFieldLabelText } from './LabelText';

export interface ITextField
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: string | false;
    additionalInputProps?: any;
    label?: string;
}

export const TextField: FunctionComponent<ITextField> = ({
    id,
    type,
    autoComplete,
    className,
    additionalInputProps,
    error,
    required,
    onChange,
    label,
    ...props
}) => {
    return (
        <div>
            {label && (
                <TextFieldLabelText id={id}>
                    {label}
                </TextFieldLabelText>
            )}
            <input
                id={id}
                onChange={onChange}
                type={type}
                autoComplete={autoComplete}
                required={required}
                className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
                {...props}
                {...additionalInputProps}
            />
            {error && <TextFieldError text={error} />}
        </div>
    );
};