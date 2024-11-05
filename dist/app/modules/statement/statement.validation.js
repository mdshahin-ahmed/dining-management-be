"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statementValidations = void 0;
const joi_1 = __importDefault(require("joi"));
const RechargeBalanceSchema = joi_1.default.object({
    body: {
        type: joi_1.default.string().valid('bkash', 'nagad').required().messages({
            'string.base': 'Payment method must be a text',
            'any.only': 'Payment method must be one of bkash or nagad',
            'any.required': 'Payment method is required.',
        }),
        mobile: joi_1.default.string()
            .length(11)
            .pattern(/^01\d+$/)
            .required()
            .messages({
            'string.length': 'Please provide a valid number',
            'string.pattern.base': 'Please provide a valid number',
            'any.required': 'Mobile number is required.',
        }),
        amount: joi_1.default.number()
            .positive() // Balance should be a positive number
            .required()
            .messages({
            'number.base': 'Balance must be a number',
            'number.positive': 'Balance must be a positive number',
            'any.required': 'Balance is required',
        }),
        transactionNumber: joi_1.default.string().required().messages({
            'string.base': 'Transaction number is required',
            'any.required': 'Transaction number is required',
        }),
    },
});
const statementStatusValidationSchema = joi_1.default.object({
    body: joi_1.default.object({
        status: joi_1.default.string().valid('approved').required().messages({
            'any.only': 'Status must be approved',
            'any.required': 'Status is required',
        }),
    }),
});
exports.statementValidations = {
    RechargeBalanceSchema,
    statementStatusValidationSchema,
};
