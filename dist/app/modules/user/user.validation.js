"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const joi_1 = __importDefault(require("joi"));
const createUserValidationSchema = joi_1.default.object({
    body: joi_1.default.object({
        name: joi_1.default.string().min(3).max(30).required(),
        email: joi_1.default.string()
            .email({ tlds: { allow: false } })
            .required(),
        mobile: joi_1.default.string()
            .length(11)
            .pattern(/^01\d+$/)
            .required()
            .messages({
            'string.length': 'Please provide a valid number',
            'string.pattern.base': 'Please provide a valid number',
            'any.required': 'Input is required.',
        }),
        hostel: joi_1.default.string().min(3).max(30).required(),
        room: joi_1.default.string().min(1).max(4).required(),
        password: joi_1.default.string().min(5).max(30).required(),
    }),
});
exports.userValidations = {
    createUserValidationSchema,
};
