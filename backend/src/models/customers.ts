import { model, Schema } from "mongoose";
import { CustomerType } from "../types/models";

const schema = new Schema<CustomerType>(
    {
        email: {
            type: String,
            required: [true, "A valid email address is required"],
            index: true,
        },
        firstName: {
            type: String,
            required: [true, "'firstName' is required"],
        },
        lastName: {
            type: String,
            required: [true, "'lastName' is required"],
        },
        country: {
            type: String,
            required: [true, "'country' is required"],
            index: true,
        },
        password: {
            type: String,
            required: [true, "'password' is required"],
        },
    },
    {
        timestamps: true,
    }
);

export default model("Customers", schema);
