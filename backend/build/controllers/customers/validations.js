"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validations = void 0;
const joi_1 = require("../../helpers/joi");
const joi_2 = __importDefault(require("joi"));
const requiredString = joi_2.default.string().required();
exports.validations = {
    NewCustomer: joi_2.default.object({
        firstName: requiredString,
        lastName: requiredString,
        email: joi_1.EmailValidationSchema.required(),
        country: requiredString,
        password: requiredString.min(6),
    }),
};
