export const routes = {
    public: {
        homepage: `/`,
        signin: `/signin`,
        signinTo: (path: string) => `/signin?redirect-to=${path}`,
        signup: `/signup`,
        activate: {
            index: `/activate`,
        },
    },
    admin: {
        index: `/admin`,
        products: {
            index: `/admin/products`,
        },
        auth: {
            index: `/admin/auth`,
            signinTo: (path: string) => `/admin/auth?redirect-to=${path}`,
        },
    },
};
