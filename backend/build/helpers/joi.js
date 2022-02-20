"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidationSchema = exports.PhoneNumberValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.PhoneNumberValidationSchema = joi_1.default
    .string()
    .length(14)
    .pattern(/^[\+234]/);
exports.EmailValidationSchema = joi_1.default.string().email();
class SchemaValidator {
    static validate(schema, object) {
        try {
            const v = schema.validate(object);
            if (v.error)
                return [false, v.error.details[0].message];
            return [true, null];
        }
        catch (e) {
            return [false, "`schema` is not a Joi.ObjectSchema"];
        }
    }
}
exports.default = SchemaValidator;
