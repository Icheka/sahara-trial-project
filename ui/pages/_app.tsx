import { ToastContainer } from 'react-toastify';

import { AuthContextProvider } from 'context';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: Record<string, any>) {
    return (
        <AuthContextProvider>
            <ToastContainer />
            <Component {...pageProps} />
        </AuthContextProvider>
    );
}

export default MyApp;
