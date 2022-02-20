"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortDocuments = void 0;
exports.SortDocuments = {
    asc: {
        byId: (a, b) => {
            if (a._id > b._id)
                return 1;
            if (a._id < b._id)
                return -1;
            return 0;
        },
    },
    desc: {
        byId: (a, b) => {
            if (a._id > b._id)
                return -1;
            if (a._id < b._id)
                return 1;
            return 0;
        },
    },
};
