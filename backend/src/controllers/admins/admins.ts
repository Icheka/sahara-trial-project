import AccessTokens from "../../helpers/authTokens";
import Crypt from "../../helpers/crypt";
import { RequestUserRoles } from "../../middleware/auth";
import admins from "../../models/admins";
import { Document } from "mongoose";
import { AdminType } from "../../types/models/admins";
import { AdminLoginPayload } from "./types";
import { AdminValidations } from "./validations";
import SchemaValidator from "../../helpers/joi";
import Logger from "../../lib/logger";

export class Admins {
    /**
     *
     * @param payload an AdminLoginPayload
     * @returns [code: |0 => successful, 1 => incorrect email or password, 2 => invalid payload|, data?]
     */
    public static async login(payload: AdminLoginPayload) {
        const [isValid, errors] = SchemaValidator.validate(AdminValidations.Login, payload);
        if (!isValid) return [2, errors];

        // 1. find admin by email
        // 2. compare passwords
        // 3. create access token

        // 1.
        const admin = await Admins.findByEmail(payload.email);
        if (!admin) return [1];

        // 2.
        const isValidPassword = await Crypt.compare(payload.password, admin.password);
        if (!isValidPassword) return [1];

        // 3.
        const accessToken = AccessTokens.create({
            _id: admin._id,
            email: admin.email,
            role: RequestUserRoles.admin,
        });

        return [0, accessToken];
    }

    public static async createIfNotExists(): Promise<any> {
        Logger.log("Checking if default admin exists...");
        let admin = await admins
            .findOne()
            .then((data) => data)
            .catch((err) => false);

        // if a database error occurred, try again
        if (admin === false) return Admins.createIfNotExists();

        if (admin === null) {
            const hash = await Crypt.hash(process.env.DEFAULT_ADMIN_PASSWORD!);
            admin = new admins({
                email: process.env.DEFAULT_ADMIN_EMAIL,
                password: hash,
            });
            admin.save();
        }

        return;
    }

    public static async fetchAll() {
        return await admins.find();
    }

    // private methods
    private static async findByEmail(email: string): Promise<false | null | (Document<any, any, AdminType> & AdminType & { _id: string })> {
        return await admins
            .findOne({ email })
            .then((data) => data)
            .catch((err) => null);
    }
}
