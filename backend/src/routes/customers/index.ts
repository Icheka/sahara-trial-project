import { Customers } from "../../controllers";
import { Router } from "express";
import AuthMiddleware from "../../middleware/auth";
export const CUSTOMERS_ROUTER = Router();
const r = CUSTOMERS_ROUTER;
const auth = AuthMiddleware;

// @route   GET /api/customers/whoami
// @desc    Fetch the current Customer
// @access  Private::Customer
r.get(`/whoami`, auth.customerAuth, async (req, res) => {
    const data = await Customers.whoAmI(req.context.user!._id);

    if (data === null) return res.sendStatus(406);
    if (data === false) return res.sendStatus(500);
    return res.send({ data });
});

// @route   POST /api/customers
// @desc    Create Customer
// @access  Public
r.post(`/`, async (req, res) => {
    const [code, data] = await Customers.create(req.body);
    switch (code) {
        case 0:
            return res.sendStatus(201);
        case 1:
        case 2:
            return res.status(406).send({ message: data });

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
