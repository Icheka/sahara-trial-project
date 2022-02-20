import { Router } from "express";
import { PRODUCTS_ROUTER } from "./products";
import { CUSTOMERS_ROUTER } from "./customers";
import { ADMINS_ROUTER } from "./admin";

export const API_ROUTER = Router();

// /products
API_ROUTER.use(`/products`, PRODUCTS_ROUTER);

// /customers
API_ROUTER.use(`/customers`, CUSTOMERS_ROUTER);

// /admins
API_ROUTER.use(`/admins`, ADMINS_ROUTER);
