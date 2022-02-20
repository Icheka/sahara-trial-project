"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../lib/logger"));
class _Error {
    guard() {
        return process.on("unhandledRejection", (err, promise) => {
            // this.log("#", `_Handler:>> Unhandled Promise Rejection[Promise: ${promise.toString()}|Error: '${err}]'`, 5);
            logger_1.default.log("An unhandled exception occurred! :>>", err);
        });
    }
}
exports.default = new _Error();
