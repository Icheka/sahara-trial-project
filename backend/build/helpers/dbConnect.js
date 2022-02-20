"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../lib/logger"));
const connect = () => {
    const atlasClient = {
        password: process.env.DB_PASSWORD,
        db: process.env.DB_NAME,
        cluster: process.env.DB_CLUSTER,
    };
    const uri = `mongodb+srv://root:${atlasClient.password}@${atlasClient.cluster}.mongodb.net/${atlasClient.db}?retryWrites=true&w=majority`;
    mongoose_1.default
        .connect(uri, { serverSelectionTimeoutMS: 1000 })
        .then((val) => logger_1.default.log("Connected to MDB Atlas successfully!"))
        .catch((err) => {
        logger_1.default.log("MDB Atlas could not connect :>>");
        // Log.log("MDB Atlas could not connect :>>", err);
        connect();
    });
};
exports.default = { connect };
