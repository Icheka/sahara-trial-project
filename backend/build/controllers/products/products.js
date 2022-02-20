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
exports.Products = void 0;
const products_1 = __importDefault(require("../../models/products"));
const randomstring_1 = __importDefault(require("randomstring"));
class Products {
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. generate code
            // 2. create product
            // 1.
            const code = Products.generateNewCode();
            // 2.
            const product = new products_1.default({
                activationCode: code,
            });
            product.save();
            return product;
        });
    }
    /**
     *
     * @param payload an ActivateProductPayload
     * @returns [code: 0 => successful, 1 => product not found, 2 => already activated]
     */
    static activate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. find product
            // 2. is product already activated?
            // 3. mark as activated
            // 4. return
            // 1.
            const product = yield Products.findByCode(payload.code);
            if (!product)
                return [1, "No Colonee product with this activation code"];
            // 2.
            if (product.isActivated === true)
                return [2, "This Colonee product has already been activated"];
            // 3.
            product.isActivated = true;
            // this next line is inherently (slightly) un-safe: validation logic should be present in the auth middleware
            // to determine that the user actually exists at the time of executing this request
            // I'll just go ahead and leave that out since this isn't a production project
            product.user = payload.userId;
            product.save();
            // 4.
            return [0];
        });
    }
    // private
    static findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_1.default
                .findOne({ activationCode: code })
                .then((data) => data)
                .catch((err) => false);
        });
    }
    static generateNewCode() {
        return __awaiter(this, void 0, void 0, function* () {
            // 1. generate code
            // 2. does another product have this code?
            const length = 12;
            // 1.
            const code = randomstring_1.default.generate(length);
            // 2.
            if (yield Products.findByCode(code)) {
                return Products.generateNewCode();
            }
            return code;
        });
    }
}
exports.Products = Products;
