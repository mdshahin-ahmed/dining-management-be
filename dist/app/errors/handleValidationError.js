"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    return {
        message: 'Please Provide Valid Information',
        errorMessage: err.message,
        errorDetails: err,
    };
};
exports.default = handleValidationError;
