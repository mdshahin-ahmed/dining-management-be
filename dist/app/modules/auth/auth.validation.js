"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidations = void 0;
const joi_1 = __importDefault(require("joi"));
const zod_1 = require("zod");
const loginValidationSchema = joi_1.default.object({
    body: joi_1.default.object({
        email: joi_1.default.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: joi_1.default.string().min(5).max(30).required(),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string({
            required_error: 'currentPassword is required.',
        }),
        newPassword: zod_1.z
            .string({
            required_error: 'newPassword is required.',
        })
            .min(6, { message: 'newPassword must be at least 6 characters long.' })
            .regex(/[a-zA-Z]/, {
            message: 'newPassword must contain at least one letter.',
        })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message: 'newPassword must contain at least one special character.',
        }),
    }),
});
exports.authValidations = {
    loginValidationSchema,
    changePasswordValidationSchema,
};
