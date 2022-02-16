import Head from "next/head";
import { FunctionComponent } from "react";

interface IPage {
    title?: string;
}

export const Page: FunctionComponent<IPage> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title ?? "Sahara.africa"}</title>
            </Head>
            {children}
        </>
    );
};
