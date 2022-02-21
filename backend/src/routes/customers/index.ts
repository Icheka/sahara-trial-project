import { Customers } from "../../controllers";
import { Router } from "express";
export const CUSTOMERS_ROUTER = Router();
const r = CUSTOMERS_ROUTER;

// @route   POST /api/customers
// @desc    Create Customer
// @access  Public
r.post(`/`, async (req, res) => {
    const [code, data] = await Customers.create(req.body);
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
});

// @route   POST /api/customers/login
// @desc    Customer Sign in
// @access  Public
r.post(`/login`, async (req, res) => {
    const [code, data] = await Customers.login(req.body);
    switch (code) {
        case 0:
            return res.send({ data });
        case 1:
            return res.status(406).send({ message: `Invalid email or password!` });

        default:
            break;
    }
});
