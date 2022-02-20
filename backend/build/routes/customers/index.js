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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMERS_ROUTER = void 0;
const controllers_1 = require("../../controllers");
const express_1 = require("express");
exports.CUSTOMERS_ROUTER = (0, express_1.Router)();
const r = exports.CUSTOMERS_ROUTER;
// @route   POST /api/customers
// @desc    Create Customer
// @access  Public
r.post(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [code, data] = yield controllers_1.Customers.create(req.body);
    switch (code) {
        case 0:
            return res.sendStatus(201);
        case 1:
            return res.status(406).send({ message: data });
        case 2:
            return res.status(500).send({ message: data });
        default:
            break;
    }
}));
// @route   POST /api/customers/login
// @desc    Customer Sign in
// @access  Public
r.post(`/login`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [code, token] = yield controllers_1.Customers.login(req.body);
    switch (code) {
        case 0:
            return res.send({ token });
        case 1:
            return res.status(406).send({ message: `Invalid email or password!` });
        default:
            break;
    }
}));
