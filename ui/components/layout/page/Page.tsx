import Head from 'next/head';
import { FunctionComponent } from 'react';
import { classNames } from 'types';
import { PublicPagesNav } from '../nav';

export interface IPage {
    title?: string;
    usePublicNav?: boolean;
    noScroll?: boolean;
    gray?: boolean;
}

export const Page: FunctionComponent<IPage> = ({
    children,
    title = 'Colonee',
    usePublicNav,
    noScroll,
    gray,
}) => {
    return (
        <div
            className={`h-screen ${!noScroll ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
        >
            <Head>
                <title>{title}</title>
            </Head>
            <div className={`${noScroll ? 'min-h-screen' : 'h-full'}`}>
                {usePublicNav && <PublicPagesNav />}
                <div className={classNames(gray ? 'bg-gray-50' : '', 'min-h-full')}>
                    {children}
                </div>
            </div>
        </div>
    );
};
