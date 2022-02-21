export const routes = {
    public: {
        signin: `/signin`,
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
