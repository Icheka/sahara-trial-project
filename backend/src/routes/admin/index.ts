import { Admins } from "../../controllers";
import { Router } from "express";
export const ADMINS_ROUTER = Router();
const r = ADMINS_ROUTER;

import auth from "../../middleware/auth";

// @route POST /api/admins/login
// @desc Admin Login
// @access Public
r.post(`/login`, async (req, res) => {
    const [code, message] = await Admins.login(req.body);

    switch (code) {
        case 0:
            return res.send({ token: message });
        case 1:
            return res.status(406).send({ message: "The email or password you provided is incorrect!" });
        case 2:
            return res.status(406).send({ message });

        default:
            break;
    }
});

r.get(`/`, async (req, res) => {
    const admins = await Admins.fetchAll();
    res.send({
        data: admins,
    });
});
