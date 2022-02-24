export * from './customer';
export * from './admin';

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
    // /api/admin
    admin: {
        login: `/admins/login`,
        whoami: `/admins/whoami`,
        products: {
            fetchAll: `/products`,
            create: `/products`,
        },
        customers: {
            fetchAll: `/customers`,
        },
    },
};

export const networkError = (err: any) => {
    console.log(err);
    return err.response?.data?.message ?? `An error occurred!`;
};
