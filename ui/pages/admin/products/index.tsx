import { FunctionComponent, useEffect, useState } from 'react';

import { NextPage } from 'next';

import { toast } from 'react-toastify';
import { FaCircle } from 'react-icons/fa';

import { AdminDashboard } from 'components/layout';
import { QRCode } from 'lib/utils';
import { AdminService } from 'services';
import { ProductType } from 'types';
import { Modal, SimpleTable, TableCell } from 'components/base';
import { coloneeActivationCode } from 'const';

const ProductsPage: NextPage = () => {
    return <View />;
};

const View: FunctionComponent = () => {
    // vars
    const headers = ['S/N', 'Activation Code', 'User', 'Status'];

    // state
    const [newActivationCode, setNewActivationCode] = useState<null | string>(null);
    const [products, setProducts] = useState<Array<ProductType>>([]);
    const [generateQRModalOpen, setGenerateQRModalOpen] = useState(false);
    const [qr, setQr] = useState<any>(null);

    // utils
    const generateQR = async () => {
        if (typeof global.window === undefined) return;

        const [status, data] = await AdminService.createProduct();
        if (status !== 0) {
            toast.error(`An error occurred. Please, try again.`);
            return;
        }

        const code = data.activationCode;
        setNewActivationCode(code);
        setGenerateQRModalOpen(true);
        setProducts([data, ...products]);

        const qr = QRCode.generate({
            text: `${process.env.NEXT_PUBLIC_ACTIVATION_URL}/activate?activation-code=ACT-${code}`,
        });

        setQr(qr);
    };
    const fetchProducts = async () => {
        const [status, data] = await AdminService.fetchProducts();
        if (status !== 0) toast.error(data);
        else setProducts(data.reverse());
    };

    // hooks
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <AdminDashboard>
            <div>
                <div className={`flex justify-between items-center mb-8`}>
                    <div className={`text-blue-500 font-medium`}>
                        Products: {products.length}
                    </div>
                    <button
                        type={'button'}
                        className="w-52 flex justify-center items-center h-10 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        // onClick={() => setGenerateQRModalOpen(true)}
                        onClick={generateQR}
                    >
                        Generate Activation Code
                    </button>
                </div>
                <div className={`min-h-[80vh]`}>
                    <div className={`w-full`}>
                        <SimpleTable
                            headers={headers}
                            rows={products.map((product, i) => {
                                const { _id, isActivated, activationCode } = product;
                                const user = product.user
                                    ? typeof product.user === 'string'
                                        ? '-'
                                        : `${product.user.lastName}, ${product.user.firstName}`
                                    : '-';
                                const status = isActivated ? 'Activated' : 'Not activated';

                                return (
                                    <tr key={_id}>
                                        <TableCell children={i + 1} />
                                        <TableCell
                                            children={`${coloneeActivationCode.label}${activationCode}`}
                                        />
                                        <TableCell children={user} />
                                        <TableCell className={`flex gap-2 items-center`}>
                                            <FaCircle
                                                size={10}
                                                className={`${
                                                    isActivated
                                                        ? 'text-green-500'
                                                        : 'text-red-400'
                                                }`}
                                            />
                                            {status}
                                        </TableCell>
                                    </tr>
                                );
                            })}
                        />
                    </div>
                </div>
            </div>
            <Modal open={generateQRModalOpen} close={() => setGenerateQRModalOpen(false)}>
                <div>
                    <div className={`flex justify-center`}>
                        <div className={``}>{qr}</div>
                    </div>
                    <div className={`flex gap-2 justify-center mt-2`}>
                        <span>Activation code:</span>
                        <span className={`font-medium`}>ACT-{newActivationCode}</span>
                    </div>
                </div>
            </Modal>
        </AdminDashboard>
    );
};

export default ProductsPage;
