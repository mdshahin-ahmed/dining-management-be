"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError_1 = __importDefault(require("../app/errors/handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("../app/errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../app/errors/handleCastError"));
const app_error_1 = __importDefault(require("../app/errors/app.error"));
const joi_1 = __importDefault(require("joi"));
const handleJoiError_1 = __importDefault(require("../app/errors/handleJoiError"));
const globalErrorHandler = (err, req, res, next) => {
    const defaultValues = {
        statusCode: 500,
        message: 'Something went wrong!',
        errorMessage: 'Something went wrong!',
        errorDetails: {},
    };
    if (err instanceof joi_1.default.ValidationError) {
        const error = (0, handleJoiError_1.default)(err);
        defaultValues.statusCode = error.statusCode;
        defaultValues.message = error.message;
        defaultValues.errorDetails = err;
        defaultValues.errorMessage = error.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const error = (0, handleDuplicateError_1.default)(err);
        defaultValues.message = error.message;
        defaultValues.errorDetails = err;
        defaultValues.errorMessage = error.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const error = (0, handleValidationError_1.default)(err);
        defaultValues.message = error.message;
        defaultValues.errorDetails = err;
        defaultValues.errorMessage = error.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const error = (0, handleCastError_1.default)(err);
        defaultValues.message = error.message;
        defaultValues.errorDetails = err;
        defaultValues.errorMessage = error.errorMessage;
    }
    else if (err instanceof app_error_1.default) {
        defaultValues.message = err.message;
        defaultValues.errorMessage = err.errorMessage;
        defaultValues.statusCode = err.statusCode;
        defaultValues.errorDetails = {};
    }
    else if (err instanceof Error) {
        defaultValues.message = err.name;
        defaultValues.errorMessage = err.message;
    }
    return res.status(defaultValues.statusCode).json({
        success: false,
        message: defaultValues.message,
        errorMessage: defaultValues.errorMessage,
        errorDetails: defaultValues.errorDetails,
        stack: (defaultValues.errorDetails && (err === null || err === void 0 ? void 0 : err.stack)) || null,
    });
};
exports.default = globalErrorHandler;
