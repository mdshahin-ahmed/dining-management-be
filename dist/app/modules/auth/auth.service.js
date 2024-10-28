"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const app_error_1 = __importDefault(require("../../errors/app.error"));
const user_model_1 = require("../user/user.model");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const isUserExists = yield user_model_1.User.findOne({
        email: payload === null || payload === void 0 ? void 0 : payload.email,
    }).select('+password');
    if (!isUserExists) {
        throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'User not found!', 'User not found!');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!isPasswordMatched) {
        throw new app_error_1.default(http_status_1.default.BAD_REQUEST, 'Password do not matched!', 'Password do not matched!');
    }
    // create token and sent to the client
    const jwtPayload = {
        _id: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
        email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        userId: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.userId,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: '365d',
    });
    return {
        user: {
            name: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.name,
            email: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
            role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
        },
        token: accessToken,
    };
});
exports.authServices = {
    loginUser,
};
