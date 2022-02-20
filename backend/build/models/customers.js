"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Customers", schema);
