import { model, Schema } from "mongoose";
import { AdminType } from "types/models/admins";

const schema = new Schema<AdminType>(
    {
        email: {
            type: String,
            required: [true, `A valid email address is required!`],
            index: true,
        },
        password: {
            type: String,
            required: [true, `A valid password is required!`],
        },
    },
    {
        timestamps: true,
    }
);

export default model("Admin", schema);
