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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestUserRoles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var RequestUserRoles;
(function (RequestUserRoles) {
    RequestUserRoles["customer"] = "customer";
    RequestUserRoles["admin"] = "admin";
})(RequestUserRoles = exports.RequestUserRoles || (exports.RequestUserRoles = {}));
class AuthMiddleware {
    /**
     * decomposes the access token from a request and saves the result to the request context
     * @param req Express Request object
     * @param res Express Response object
     * @param next callback to call if the decomposition operation was possible
     * @returns {any}
     */
    static decompose(req, res, next) {
        const accessToken = req.body.token || req.query.token || req.headers["x-access-token"] || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : false);
        if (!accessToken)
            return res.status(403).send("An access token is required for authentication");
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET);
            if (req.context)
                req.context.user = decoded;
            else
                req.context = { user: decoded };
            if (next)
                return next(req.context.user);
        }
        catch (e) {
            if (next)
                return next();
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
    static authenticate(req, res, next, roles) {
        return AuthMiddleware.decompose(req, res, (decoded) => {
            if (decoded === undefined)
                return res.status(500).send("An error occurred!");
            if ((Array.isArray(roles) && !roles.includes(decoded.role)) || decoded.role !== roles)
                return res.status(401).send(`Invalid access token`);
            return next();
        });
    }
    static customerAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return AuthMiddleware.authenticate(req, res, next, RequestUserRoles.customer);
        });
    }
    static adminAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return AuthMiddleware.authenticate(req, res, next, RequestUserRoles.admin);
        });
    }
}
exports.default = AuthMiddleware;
