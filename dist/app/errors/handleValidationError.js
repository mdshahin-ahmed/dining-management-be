"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    return {
        message: 'Validation Error mon',
        errorMessage: err.message,
        errorDetails: err,
    };
};
exports.default = handleValidationError;
