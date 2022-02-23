import { FunctionComponent, ReactElement } from 'react';

interface ISimpleTable {
    headers: Array<ReactElement | string>;
    rows: Array<ReactElement>;
    noBorderShadow?: boolean;
}

export const TableCell: FunctionComponent<{ className?: string }> = ({
    children,
    className,
}) => <td className={`px-4 py-3 whitespace-nowrap ${className}`}>{children}</td>;

export const SimpleTable: FunctionComponent<ISimpleTable> = ({
    headers,
    rows,
    noBorderShadow,
}) => {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div
                        className={`${
                            noBorderShadow ?? 'shadow'
                        } overflow-hidden border-b border-gray-200 sm:rounded-lg`}
                    >
                        <table className="min-w-full divide-y divide-gray-200 table-fixed">
                            <thead className="bg-gray-50">
                                <tr>
                                    {headers.map((header, headerID) => (
                                        <th
                                            key={headerID}
                                            scope="col"
                                            className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
