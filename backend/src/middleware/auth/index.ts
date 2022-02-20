import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Logger from "../../lib/logger";

export type RequestUser = {
    email: string;
    _id: string;
    role: RequestUserRoles;
};
export enum RequestUserRoles {
    customer = "customer",
    admin = "admin",
}

class AuthMiddleware {
    /**
     * decomposes the access token from a request and saves the result to the request context
     * @param req Express Request object
     * @param res Express Response object
     * @param next callback to call if the decomposition operation was possible
     * @returns {any}
     */
    public static decompose(req: Request, res: Response, next?: (decoded?: RequestUser) => any) {
        const accessToken = req.body.token || req.query.token || req.headers["x-access-token"] || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : false);

        if (!accessToken) return res.status(403).send("An access token is required for authentication");

        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!);
            if (req.context) req.context.user = decoded as any;
            else req.context = { user: decoded as any };
            if (next) return next(req.context.user);
        } catch (e) {
            Logger.log(e);
            if (next) return next();
        }
    }

    /**
     * authenticates a user by the associated Request object
     * @param req Express Request object
     * @param res Express Response object
     * @param next Express NextFunction
     * @param roles if Array, an array of RequestUserRoles; else a RequestUserRoles
     * @returns {any}
     */
    public static authenticate(req: Request, res: Response, next: NextFunction, roles: RequestUserRoles | Array<RequestUserRoles>) {
        return AuthMiddleware.decompose(req, res, (decoded) => {
            if (decoded === undefined) return res.status(500).send("An error occurred!");

            if ((Array.isArray(roles) && !roles.includes(decoded.role)) || decoded.role !== roles) return res.status(401).send(`Invalid access token`);
            return next();
        });
    }

    public static async customerAuth(req: Request, res: Response, next: NextFunction) {
        return AuthMiddleware.authenticate(req, res, next, RequestUserRoles.customer);
    }

    public static async adminAuth(req: Request, res: Response, next: NextFunction) {
        return AuthMiddleware.authenticate(req, res, next, RequestUserRoles.admin);
    }
}

export default AuthMiddleware;
