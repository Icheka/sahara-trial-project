import { AdminDashboard } from 'components/layout';
import { QRCode } from 'lib/utils';
import { NextPage } from 'next';

const CreateActivationCodePage: NextPage = () => {
    // utils
    const generateQR = () => {
        if (typeof global.window === undefined) return;
        const qr = QRCode.generate({ text: `${global.window?.location?.origin}/activate?activation-code=ACT-${''}` });
        return qr;
    };

    return (
        <AdminDashboard>
            <div>
                <div className={`uppercase text-md text-blue-100`}>{generateQR()}</div>
            </div>
        </AdminDashboard>
    );
};

export default CreateActivationCodePage;
