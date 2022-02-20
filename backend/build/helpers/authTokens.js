"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookies_1 = require("./cookies");
class AccessTokens {
    static create(user, expiresIn, req, res) {
        expiresIn = expiresIn !== null && expiresIn !== void 0 ? expiresIn : "30d";
        const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, { expiresIn });
        if (req && res)
            (0, cookies_1.setTokenCookie)(token, req, res);
        return token;
    }
}
exports.default = AccessTokens;
