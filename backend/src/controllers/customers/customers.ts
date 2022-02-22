import AccessTokens from "../../helpers/authTokens";
import Crypt from "../../helpers/crypt";
import SchemaValidator from "../../helpers/joi";
import { RequestUserRoles } from "../../middleware/auth";
import customers from "../../models/customers";
import { Document } from "mongoose";
import { CustomerType } from "../../types/models";
import { CustomerLoginPayload, NewCustomer } from "./types";
import { CustomerValidations } from "./validations";

/**
 * utility class (meant to be used with static methods)
 */
export class Customers {
    /**
     * fetch a Customer given a UUID
     * @param id a customer account UUID
     * @returns CustomerType if customer was found and there were no errors, else false if errors or null if no errors
     */
    public static async whoAmI(id: string) {
        return await customers
            .findById(id)
            .then((data) => data)
            .catch((err) => false);
    }

    /**
     *
     * @param payload a NewCustomer
     * @returns |codes: 0 => successful, 1 => payload validation error, 2 => user already exists|
     */
    public static async create(payload: NewCustomer) {
        // 1. validate payload
        // 2. hash password
        // 3. create customer
        // 4. return

        // 1.
        const [isValid, errors] = SchemaValidator.validate(CustomerValidations.NewCustomer, payload);
        if (!isValid) return [1, errors];

        // 2.
        const hash = await Crypt.hash(payload.password);
        payload.password = hash!;

        // 3.
        let customer = await Customers.findByEmail(payload.email);
        if (customer) return [2, "A user account already exists with this email"];

        customer = new customers(payload);
        customer.save();

        // 4.
        return [0];
    }

    public static async login(payload: CustomerLoginPayload) {
        // 1. find customer by email
        // 2. compare passwords
        // 3. create access token

        // 1.
        const customer = await Customers.findByEmail(payload.email);
        if (!customer) return [1];

        // 2.
        const isValid = await Crypt.compare(payload.password, customer.password);
        if (!isValid) return [1];

        // 3.
        const accessToken = AccessTokens.create({
            _id: customer._id,
            email: customer.email,
            role: RequestUserRoles.customer,
        });

        return [0, { token: accessToken, user: customer }];
    }

    // private methods
    private static async findByEmail(email: string): Promise<false | null | (Document<any, any, CustomerType> & CustomerType & { _id: string })> {
        return await customers
            .findOne({ email })
            .then((data) => data)
            .catch((err) => null);
    }
}
