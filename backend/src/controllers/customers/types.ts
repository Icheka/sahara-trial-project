export type NewCustomer = {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    password: string;
};

export type CustomerLoginPayload = {
    email: string;
    password: string;
};
