"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static log(...args) {
        const env = process.env.NODE_ENV;
        switch (env) {
            case "production":
            case "development":
                return;
            case "test":
                console.log(...args);
                return;
            default:
                break;
        }
    }
}
exports.default = Logger;
