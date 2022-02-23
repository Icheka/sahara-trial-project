import { Products } from "../../controllers";
import { Router } from "express";
export const PRODUCTS_ROUTER = Router();
const r = PRODUCTS_ROUTER;

import auth from "../../middleware/auth";

// @route GET /api/products
// @desc Fetch all products
// @access Private:Admin
r.get(`/`, auth.adminAuth, async (req, res) => {
    const products = await Products.fetchAll();

    res.send({
        data: products,
    });
});

// @route POST /api/products
// @desc Create a new product
// @access Private:Admin
r.post(`/`, auth.adminAuth, async (req, res) => {
    const product = await Products.create();

    return res.send({
        data: product,
    });
});

// @route /api/products/activate
// @desc Create a new product
// @access Private:Customer
r.patch(`/activate`, auth.customerAuth, async (req, res) => {
    const [status, message] = await Products.activate({
        ...req.body,
        userId: req.context.user!._id,
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
});
