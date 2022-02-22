import { FunctionComponent } from 'react';

export const FormSectionHeader: FunctionComponent<{ text: string }> = ({
    children,
    text,
}) => <h3 className={`text-sm text-semibold text-blue-500`}>{text ?? children}</h3>;
