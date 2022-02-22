import { FunctionComponent } from 'react';

interface ICheckbox {
    label?: string;
    id?: string;
    name?: string;
    className?: string;
    labelClassName?: string;
    onChange?: (value: string) => void;
    checked?: boolean;
}

export const Checkbox: FunctionComponent<ICheckbox> = ({
    className,
    id = `checkbox-${Math.random().toString().slice(0, 4)}`,
    label,
    name,
    labelClassName,
    onChange,
    checked,
}) => {
    // vars
    name = name ?? id;

    return (
        <div className="flex items-center">
            <input
                id={id}
                name={name}
                type="checkbox"
                className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${className}`}
                onChange={(e) => onChange && onChange(e.currentTarget.value)}
                checked={checked}
            />
            <label
                htmlFor={id}
                className={`ml-2 block text-sm text-gray-900 ${labelClassName}`}
            >
                {label}
            </label>
        </div>
    );
};
