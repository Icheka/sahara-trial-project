import { FunctionComponent, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AuthContext } from 'context';
import { AdminService } from 'services';
import { AdminType } from 'types/accounts';
import { routes } from 'config';
import { PageLoading } from '../loading';
import { IPage, Page } from '../Page';

const WithAdmin: FunctionComponent<{ fallbackURL?: string }> = ({
    fallbackURL,
    children,
}) => {
    // vars
    const { updateContextWithDraft } = useContext(AuthContext);
    const router = useRouter();
    fallbackURL = fallbackURL ?? router.asPath;
    const pageLoading = (
        <Page noScroll>
            <PageLoading />
        </Page>
    );

    // state
    const [user, setUser] = useState<AdminType | null>(null);
    const [loading, setLoading] = useState(true);

    // utils
    const fetchUser = async () => {
        const [status, data] = await AdminService.whoami();
        if (status === 0) {
            updateContextWithDraft &&
                updateContextWithDraft((draft) => {
                    draft.user = data;
                    draft.accountType = 'admin';
                });
            setUser(data);
        }
        setLoading(false);
    };

    // utils
    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) return pageLoading;

    if (user === null) {
        router.replace(routes.admin.auth.signinTo(fallbackURL));
        // return page loading while processing redirection
        return pageLoading;
    }

    return <>{children}</>;
};

export const SecureAdminPage: FunctionComponent<IPage> = (props) => {
    // vars

    return (
        <WithAdmin>
            <Page {...props} />
        </WithAdmin>
    );
};
