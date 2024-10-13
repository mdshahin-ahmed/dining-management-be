"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    return {
        message: 'Invalid ID',
        errorMessage: `${err.value} is not a valid ID!`,
        errorDetails: err,
    };
};
exports.default = handleCastError;
