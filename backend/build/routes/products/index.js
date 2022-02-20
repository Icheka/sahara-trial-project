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
exports.PRODUCTS_ROUTER = void 0;
const controllers_1 = require("../../controllers");
const express_1 = require("express");
exports.PRODUCTS_ROUTER = (0, express_1.Router)();
const r = exports.PRODUCTS_ROUTER;
const auth_1 = __importDefault(require("../../middleware/auth"));
r.get(`/`, (req, res) => {
    res.send(`LIST ALL PRODUCTS`);
});
// @route /api/products
// @desc Create a new product
// @access Private:Admin
r.post(`/`, auth_1.default.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield controllers_1.Products.create();
    return res.send({
        data: product,
    });
}));
// @route /api/products
// @desc Create a new product
// @access Private:Customer
r.patch(`/:id/activate`, auth_1.default.customerAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [status, message] = yield controllers_1.Products.activate({
        code: req.query.id,
        userId: req.context.user._id,
    });
    switch (status) {
        case 0:
            return res.sendStatus(200);
        case 1:
        case 2:
            return res.status(406).send({ message });
        default:
            break;
    }
}));
