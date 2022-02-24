import axios from 'axios';

import { toast } from 'react-toastify';

import { routes } from './routes';

export const https = axios;

const handleAuthTokenErrors = (error: any) => {
    const ACCESS_TOKEN_ERROR_STATUSES = [401, 403];

    if (
        error?.response?.status &&
        ACCESS_TOKEN_ERROR_STATUSES.includes(error?.response?.status)
    ) {
        // toast.error(`You must sign in to continue`);
        // location.href = routes.public.signin;
    }
};
const getToken = (): string | null => localStorage.getItem('auth');
export const setAuthToken = (token: string) => localStorage.setItem('auth', token);
export const getAuthToken = getToken;

// https
https.interceptors.request.use((req) => {
    req.url = process.env.NEXT_PUBLIC_API_URL! + req.url;
    let path = new URL(req.url).pathname;

    if (!path.endsWith(`/`)) {
        path = path + '/';
        const newURL = new URL(req.url);
        newURL.pathname = path;
        req.url = newURL.toString();
    }

    const token = getToken();
    req.headers!.Authorization = `Bearer ${token}`;

    return Promise.resolve(req);
});

https.interceptors.response.use(
    (res) => res,
    (error) => {
        handleAuthTokenErrors(error);

        return Promise.reject(error);
    }
);

export const formDataFetch = (
    url: string,
    {
        body,
    }: {
        body: any;
    }
) => {
    const headers = {
        authorization: `Bearer ${getToken()}`,
    };
    return fetch(`${process.env.NEXT_PUBLIC_API_URL!}${url}`, {
        body,
        method: 'post',
        headers,
    });
};
