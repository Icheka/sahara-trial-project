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
exports.Customers = void 0;
const authTokens_1 = __importDefault(require("../../helpers/authTokens"));
const crypt_1 = __importDefault(require("../../helpers/crypt"));
const joi_1 = __importDefault(require("../../helpers/joi"));
const auth_1 = require("../../middleware/auth");
const customers_1 = __importDefault(require("../../models/customers"));
const validations_1 = require("./validations");
/**
 * utility class (meant to be used with static methods)
 */
class Customers {
    /**
     *
     * @param payload a NewCustomer
     * @returns |codes: 0 => successful, 1 => payload validation error, 2 => database error|
     */
    static create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. validate payload
            // 2. hash password
            // 3. create customer
            // 4. return
            // 1.
            const [isValid, errors] = joi_1.default.validate(validations_1.validations.NewCustomer, payload);
            if (!isValid)
                return [1, errors];
            // 2.
            const hash = yield crypt_1.default.hash(payload.password);
            payload.password = hash;
            // 3.
            const customer = yield customers_1.default
                .create(payload)
                .then((data) => data)
                .catch((err) => null);
            if (!customer)
                return [2, "An error occurred!"];
            // 4.
            return [0];
        });
    }
    static login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. find customer by email
            // 2. compare passwords
            // 3. create access token
            // 1.
            const customer = yield Customers.findByEmail(payload.email);
            if (!customer)
                return [1];
            // 2.
            const isValid = yield crypt_1.default.compare(payload.password, customer.password);
            if (!isValid)
                return [1];
            // 3.
            const accessToken = authTokens_1.default.create({
                _id: customer._id,
                email: customer.email,
                role: auth_1.RequestUserRoles.customer,
            });
            return [0, accessToken];
        });
    }
    // private methods
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield customers_1.default
                .findOne({ email })
                .then((data) => data)
                .catch((err) => null);
        });
    }
}
exports.Customers = Customers;
