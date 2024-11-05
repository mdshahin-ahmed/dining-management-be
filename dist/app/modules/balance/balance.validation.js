"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceValidations = void 0;
const joi_1 = __importDefault(require("joi"));
const addBalanceValidationSchema = joi_1.default.object({
    body: joi_1.default.object({
        id: joi_1.default.string().required(),
        amount: joi_1.default.number().positive().min(50).required().messages({
            'number.base': 'Amount must be a number',
            'number.positive': 'Amount must be a positive number',
            'number.min': 'Amount must be at least 50',
            'any.required': 'Amount is required',
        }),
    }),
});
exports.balanceValidations = {
    addBalanceValidationSchema,
};
