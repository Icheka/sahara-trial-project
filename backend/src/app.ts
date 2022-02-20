import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import requestIP from "request-ip";
import path from "path";
import Log from "./lib/logger";
import dbConnect from "./helpers/dbConnect";
import _error from "./helpers/_error";
import dotenv from "dotenv";
import { API_ROUTER } from "./routes";
import { RequestUser } from "./middleware/auth";

// application setup
const ENV_FILE = process.argv.length > 2 ? process.argv[2] : undefined;
_error.guard();
ENV_FILE && dotenv.config({ path: path.join(process.cwd(), ENV_FILE) });
const app = express();
dbConnect.connect();

// middleware
app.use(
    cors({
        origin: (origin, callback) => callback(null, true),
        // origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(requestIP.mw());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// extend express Request
import { Express } from "express-serve-static-core";
import { Admins } from "./controllers";

type RequestContext = {
    user?: RequestUser;
};

declare module "express-serve-static-core" {
    interface Request {
        context: RequestContext;
    }
}

// routes
// APIS
app.use(`/api`, API_ROUTER);

// startup/exit
const port = process.env.PORT;
if (!port) throw `Application PORT must be defined!`;

// const server = app.listen(port, () => {
//     Admins.createIfNotExists();
// });
const server = app.listen(port, () => {
    Log.log(`Listening at port ${port}`)
    Admins.createIfNotExists();
});

export default server;
