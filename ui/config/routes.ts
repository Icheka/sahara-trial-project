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
        createActivationCode: {
            index: `/admin/activation-codes/create`,
        },
    },
};
