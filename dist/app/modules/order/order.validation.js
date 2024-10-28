"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidations = void 0;
const joi_1 = __importDefault(require("joi"));
const orderStatusValidationSchema = joi_1.default.object({
    body: joi_1.default.object({
        status: joi_1.default.string()
            .valid('approved', 'canceled', 'pending')
            .required()
            .messages({
            'any.only': 'Status must be one of pending, approved, or canceled',
            'any.required': 'Status is required',
        }),
    }),
});
exports.orderValidations = {
    orderStatusValidationSchema,
};
