"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ROUTER = void 0;
const express_1 = require("express");
const products_1 = require("./products");
const customers_1 = require("./customers");
exports.API_ROUTER = (0, express_1.Router)();
// /products
exports.API_ROUTER.use(`/products`, products_1.PRODUCTS_ROUTER);
// /customers
exports.API_ROUTER.use(`/customers`, customers_1.CUSTOMERS_ROUTER);
