import { FunctionComponent } from "react"

export const TextFieldError: FunctionComponent<{ text?: string }> = ({ children, text }) => (
    <div className={`text-xs text-red-500 mt-1`}>{text ?? children}</div>
);
