"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Products", schema);
