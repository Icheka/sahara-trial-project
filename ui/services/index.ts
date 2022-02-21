export * from './customer';

export const api = {
    // /api/customers
    customers: {
        login: `/customers/login`,
    },
};

export const networkError = (err: any) =>
    err.response?.data?.message ?? `An error occurred!`;
