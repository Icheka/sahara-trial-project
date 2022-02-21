import { model, Schema } from "mongoose";
import { CustomerType, FamilyHistoryType } from "../types/models";

const familyHistory = new Schema<FamilyHistoryType>({
    cardiovascular: {
        type: String,
    },
    colorectalCancer: {
        type: String,
    },
    gerd: {
        type: String,
    },
    ibd: {
        type: String,
    },
    nash: {
        type: String,
    },
    t2dm: {
        type: String,
    },
});

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
        gender: {
            type: String,
        },
        dob: {
            type: Number,
        },
        ethnicity: {
            type: String,
        },
        height: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        familyHistory: {
            type: familyHistory,
        },
    },
    {
        timestamps: true,
    }
);

export default model("Customers", schema);
