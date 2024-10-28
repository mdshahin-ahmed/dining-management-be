"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const joi_1 = __importDefault(require("joi"));
// const createUserValidationSchema = Joi.object({
//   body: Joi.object({
//     name: Joi.string().min(3).max(30).required(),
//     email: Joi.string()
//       .email({ tlds: { allow: false } })
//       .required(),
//     mobile: Joi.string()
//       .length(11)
//       .pattern(/^01\d+$/)
//       .required()
//       .messages({
//         'string.length': 'Please provide a valid number',
//         'string.pattern.base': 'Please provide a valid number',
//         'any.required': 'Mobile number is required.',
//       }),
//     hostel: Joi.string().min(3).max(30).required(),
//     room: Joi.string().min(1).max(4).required(),
//     password: Joi.string().min(5).max(30).required(),
//   }),
// })
const createAdminValidationSchema = joi_1.default.object({
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
            'any.required': 'Mobile number is required.',
        }),
        hostel: joi_1.default.string().min(3).max(30).required(),
        room: joi_1.default.string().min(1).max(4).required(),
        password: joi_1.default.string().min(5).max(30).required(),
        userId: joi_1.default.string().required(),
        role: joi_1.default.string().valid('admin', 'user').required().messages({
            'string.base': 'Role must be a text.',
            'any.only': 'Role must be one of admin or user',
            'any.required': 'Role is required.',
        }),
    }),
});
const addBalanceSchema = joi_1.default.object({
    body: joi_1.default.object({
        id: joi_1.default.string().required(),
        balance: joi_1.default.number()
            .positive() // Balance should be a positive number
            .required()
            .messages({
            'number.base': 'Balance must be a number',
            'number.positive': 'Balance must be a positive number',
            'any.required': 'Balance is required',
        }),
    }),
});
exports.userValidations = {
    createAdminValidationSchema,
    addBalanceSchema,
};
