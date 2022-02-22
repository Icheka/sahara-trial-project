import { FunctionComponent } from 'react';

import Loader from 'react-loading';

export const PageLoading: FunctionComponent = () => {
    return (
            <div className={`h-full flex-1 flex justify-center items-center bg-blue-50`}>
                <Loader type="spin" width={40} color={`indigo`} />
            </div>
    );
};
