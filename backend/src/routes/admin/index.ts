import { Admins } from "../../controllers";
import { Router } from "express";
export const ADMINS_ROUTER = Router();
const r = ADMINS_ROUTER;

import auth from "../../middleware/auth";

// @route POST /api/admins/whoami
// @desc Admin WhoAmI
// @access Private::Admin
r.get(`/whoami`, auth.adminAuth, async (req, res) => {
    const { _id } = req.context.user!;

    const data = await Admins.whoami(_id);

    if (data === null) {
        return res.status(406).send({ message: "" });
    }
    return res.send({ data });
});

// @route POST /api/admins/login
// @desc Admin Login
// @access Public
r.post(`/login`, async (req, res) => {
    const [code, message] = await Admins.login(req.body);

    switch (code) {
        case 0:
            return res.send({ data: message });
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
