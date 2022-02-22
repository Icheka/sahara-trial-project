import products from "../../models/products";
import { Document } from "mongoose";
import Randomstring from "randomstring";
import { ProductType } from "../../types/models/products";
import { ActivateProductPayload } from "./types";

export class Products {
    public static async fetchAll() {
        return await products.find();
    }

    public static async create() {
        // 1. generate code
        // 2. create product

        // 1.
        const code = await Products.generateNewCode();

        // 2.
        const product = new products({
            activationCode: code,
        });
        product.save();

        return product;
    }

    /**
     *
     * @param payload an ActivateProductPayload
     * @returns [code: 0 => successful, 1 => product not found, 2 => already activated]
     */
    public static async activate(payload: ActivateProductPayload) {
        // 1. find product
        // 2. is product already activated?
        // 3. mark as activated
        // 4. return

        // 1.
        if (payload.activationCode.startsWith("ACT-")) payload.activationCode = payload.activationCode.slice(4);
        let product = await Products.findByCode(payload.activationCode);
        if (!product) return [1, "No Colonee product with this activation code"];

        // 2.
        if (product.isActivated === true) return [2, "This Colonee product has already been activated"];

        // 3.
        product.isActivated = true;
        // this next line is inherently (slightly) un-safe: validation logic should be present in the auth middleware
        // to determine that the user actually exists at the time of executing this request
        // I'll just go ahead and leave that out since this isn't a production project
        product.user = payload.userId;
        delete (payload as any).userId;

        await products.findByIdAndUpdate(product.id, { ...payload });

        // 4.
        return [0];
    }

    // private
    private static async findByCode(code: string): Promise<false | null | (Document<any, any, ProductType> & ProductType & { _id: string })> {
        return await products
            .findOne({ activationCode: code })
            .then((data) => data)
            .catch((err) => false);
    }
    private static async generateNewCode(): Promise<string> {
        // 1. generate code
        // 2. does another product have this code?
        const length = 12;

        // 1.
        const code = Randomstring.generate(length);

        // 2.
        if (await Products.findByCode(code)) {
            return Products.generateNewCode();
        }

        return code;
    }
}
