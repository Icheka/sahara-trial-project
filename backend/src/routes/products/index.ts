import { Products } from "../../controllers";
import { Router } from "express";
export const PRODUCTS_ROUTER = Router();
const r = PRODUCTS_ROUTER;

import auth from "../../middleware/auth";

r.get(`/`, auth.adminAuth, async (req, res) => {
    const products = await Products.fetchAll();

    res.send({
        data: products,
    });
});

// @route /api/products
// @desc Create a new product
// @access Private:Admin
r.post(`/`, auth.adminAuth, async (req, res) => {
    const product = await Products.create();

    return res.send({
        data: product,
    });
});

// @route /api/products
// @desc Create a new product
// @access Private:Customer
r.patch(`/:code/activate`, auth.customerAuth, async (req, res) => {
    const [status, message] = await Products.activate({
        code: req.params.code as string,
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
