"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = __importDefault(require("../lib/logger"));
class Crypt {
    static hash(plainText, rounds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default
                .hash(plainText, rounds || 10)
                .then((value) => value)
                .catch((err) => {
                logger_1.default.log("Error hashing text! :>>", err);
                return null;
            });
        });
    }
    static compare(plainText, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default
                .compare(plainText, hash)
                .then((value) => value)
                .catch((err) => {
                logger_1.default.log("Error comparing hash! :>>", err);
                return null;
            });
        });
    }
}
exports.default = Crypt;
