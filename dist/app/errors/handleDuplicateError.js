"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    return {
        message: 'Duplicate Entry',
        errorMessage: `${extractedMessage} is already exist`,
        errorDetails: err,
    };
};
exports.default = handleDuplicateError;
