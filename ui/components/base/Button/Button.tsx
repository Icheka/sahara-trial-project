import { FunctionComponent, ReactNode } from "react";

import { FiLoader } from "react-icons/fi";

export interface IButton {
    onClick?: () => void;
    type?: "button" | "reset" | "submit";
    disabled?: boolean;
    isLoading?: boolean;
    cssClasses?: string;
    variant?: "primary" | "secondary";
    leftIcon?: ReactNode;
    useDefaultPadding?: boolean;
}

export const Button: FunctionComponent<IButton> = ({ onClick, disabled, isLoading, children, cssClasses, useDefaultPadding, type = "button", variant = "primary", leftIcon, ...rest }) => {
    // vars
    const classes: Array<string> = [`flex justify-between items-center ${useDefaultPadding && 'px-4 py-1'} text-sm font-normal shadow-sm transition duration-300 text-sm`];
    if (variant === "primary") classes.push(`bg-theme-green text-white hover:shadow-inner-md hover:bg-green-900`);
    else classes.push(`text-design-accent-100 hover:bg-design-accent-100 hover:text-white border-design-accent-100`);
    if (disabled || isLoading) classes.push(`bg-lpGray hover:cursor-not-allowed text-lpGray-dark`);
    if (disabled) classes.push("opacity-50");
    if (cssClasses) classes.push(cssClasses);

    return (
        <button onClick={onClick} className={classes.join(" ")} disabled={isLoading || disabled} {...rest}>
            {isLoading && (
                <span className="ml-2">
                    <FiLoader />
                </span>
            )}
            {leftIcon && <span className={`mr-1`}>{leftIcon}</span>}
            <span>{children}</span>
        </button>
    );
};
