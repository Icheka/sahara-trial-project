import { Fragment, FunctionComponent, ReactNode, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { classNames } from 'types';
import { TextFieldError } from '../TextInput';
import { useEffect } from 'react';

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Caroline Schultz' },
    { id: 8, name: 'Mason Heaney' },
    { id: 9, name: 'Claudie Smitham' },
    { id: 10, name: 'Emil Schaefer' },
];

interface ISelectListItem {
    value: string;
    label: string | ReactNode;
}

export interface ISelect {
    onSelect: (index: number, value?: string) => void;
    label?: string;
    items: Array<ISelectListItem>;
    error?: string | false;
    callOnChangeOnMount?: boolean;
}

export const Select: FunctionComponent<ISelect> = ({
    callOnChangeOnMount,
    label,
    error,
    onSelect,
    items,
}) => {
    // state
    const [selected, setSelected] = useState(items[0]?.value ?? '');

    // utils
    const findIndex = (v: ISelectListItem) => {
        return items.findIndex((item) => item.value == v?.value);
    };
    const findSelected = (value: string) => {
        return items.find((item) => item.value === value);
    };
    const handleSelect = (value: string) => {
        setSelected(value);

        const item = findSelected(value);
        onSelect(findIndex(item!));
    };

    useEffect(() => {
        if (callOnChangeOnMount) onSelect(findIndex(findSelected(selected)!));
    }, []);

    return (
        <Listbox value={selected} onChange={handleSelect}>
            {({ open }) => (
                <>
                    {label && (
                        <Listbox.Label className="block text-sm font-medium text-gray-700">
                            {label}
                        </Listbox.Label>
                    )}
                    <div className="mt-1 relative">
                        <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="block truncate">
                                {findSelected(selected)?.label}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {items.map(({ label, value }, i) => (
                                    <Listbox.Option
                                        key={i}
                                        className={({ active }) =>
                                            classNames(
                                                active
                                                    ? 'text-white bg-indigo-600'
                                                    : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={value}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={classNames(
                                                        selected
                                                            ? 'font-semibold'
                                                            : 'font-normal',
                                                        'block truncate'
                                                    )}
                                                >
                                                    {label}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active
                                                                ? 'text-white'
                                                                : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                    {error && <TextFieldError text={error} />}
                </>
            )}
        </Listbox>
    );
};
