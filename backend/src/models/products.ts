import { model, Schema } from "mongoose";
import { ProductType } from "../types/models/products";

const schema = new Schema<ProductType>(
    {
        isActivated: {
            type: Boolean,
            default: false,
            index: true,
        },
        activationCode: {
            type: String,
            required: [true, "An activation code!"],
        },
        user: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export default model("Products", schema);
