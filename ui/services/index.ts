export * from './customer';

export const api = {
    // /api/customers
    customers: {
        login: `/customers/login`,
        signup: `/customers`,
        whoami: `/customers/whoami`,
    },
    // /api/products
    product: {
        activate: `/products/activate`,
    },
};

export const networkError = (err: any) =>
    err.response?.data?.message ?? `An error occurred!`;
