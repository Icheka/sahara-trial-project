"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const request_ip_1 = __importDefault(require("request-ip"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./lib/logger"));
const dbConnect_1 = __importDefault(require("./helpers/dbConnect"));
const _error_1 = __importDefault(require("./helpers/_error"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
// application setup
const ENV_FILE = process.argv.length > 2 ? process.argv[2] : undefined;
_error_1.default.guard();
ENV_FILE && dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ENV_FILE) });
const app = (0, express_1.default)();
dbConnect_1.default.connect();
// middleware
app.use((0, cors_1.default)({
    origin: (origin, callback) => callback(null, true),
    // origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(request_ip_1.default.mw());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// routes
// APIS
app.use(`/api`, routes_1.API_ROUTER);
// startup/exit
const port = process.env.PORT;
if (!port)
    throw `Application PORT must be defined!`;
console.log('Here', port);
const server = app.listen(port, () => logger_1.default.log(`Listening at port ${port}`));
exports.default = server;
