import Head from 'next/head';
import { FunctionComponent } from 'react';
import { PublicPagesNav } from '../nav';

interface IPage {
    title?: string;
    usePublicNav?: boolean;
}

export const Page: FunctionComponent<IPage> = ({
    children,
    title = 'Colonee',
    usePublicNav,
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                {usePublicNav && <PublicPagesNav />}
                {children}
            </div>
        </>
    );
};
