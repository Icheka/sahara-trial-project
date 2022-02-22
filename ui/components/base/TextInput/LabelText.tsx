import { FunctionComponent } from 'react';

interface ITextFieldLabelText {
    id?: string;
    className?: string;
}

export const TextFieldLabelText: FunctionComponent<ITextFieldLabelText> = ({
    children,
    id,
    className,
}) => (
    <label
        htmlFor={id}
        className={`block text-sm mb-1 font-medium text-gray-700 ${className}`}
    >
        {children}
    </label>
);
