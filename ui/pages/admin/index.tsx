import { SimpleTable, TableCell } from 'components/base';
import { AdminDashboard } from 'components/layout';
import { DateUtil } from 'lib/utils/date';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AdminService } from 'services';
import { CustomerType } from 'types';

const AdminIndexPage: NextPage = () => {
    // vars
    const headers = ['S/N', 'Name', 'Email', 'Country', 'Registration'];

    // state
    const [customers, setCustomers] = useState<Array<CustomerType>>([]);

    // utils
    const fetchCustomers = async () => {
        const data = await AdminService.fetchCustomers();

        if (Array.isArray(data)) setCustomers(data);
        else toast.error('An error occurred. Please, try again.');
    };

    // hooks
    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <AdminDashboard>
            <div>
                <div className={`flex justify-between items-center mb-8`}>
                    <div className={`text-blue-500 font-medium`}>
                        Users: {customers.length}
                    </div>
                </div>
                <div className={`min-h-[80vh]`}>
                    <div className="w-full">
                        <SimpleTable
                            headers={headers}
                            rows={customers.map((customer, i) => {
                                // vars
                                const {
                                    _id,
                                    country,
                                    firstName,
                                    email,
                                    lastName,
                                    createdAt,
                                } = customer;
                                const registration: Record<string, string | Date> = {
                                    value: DateUtil.numberToDate(createdAt),
                                };
                                const v = registration.value as Date;
                                registration.day = v.getDate().toString();
                                registration.month = DateUtil.getMonth(v.getMonth()).long;
                                registration.year = v.getFullYear().toString();
                                registration.toString = () =>
                                    `${registration.day} ${registration.month}, ${registration.year}`;

                                return (
                                    <tr key={_id}>
                                        <TableCell children={i + 1} />
                                        <TableCell children={`${lastName}, ${firstName}`} />
                                        <TableCell children={email} />
                                        <TableCell children={country} />
                                        <TableCell children={registration.toString()} />
                                    </tr>
                                );
                            })}
                        />
                    </div>
                </div>
            </div>
        </AdminDashboard>
    );
};

export default AdminIndexPage;
