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
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const app_error_1 = __importDefault(require("../../errors/app.error"));
const user_model_1 = require("./user.model");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { role: 'user' }));
    return {
        username: result.name,
        email: result.email,
        role: result.role,
        _id: result._id,
    };
});
const createAdminIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.User.create(payload);
    return {
        username: result.name,
        email: result.email,
        role: result.role,
        _id: result._id,
    };
});
const getMe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const isUserExists = yield user_model_1.User.findOne({
        email: payload === null || payload === void 0 ? void 0 : payload.email,
    });
    if (!isUserExists) {
        throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'User not found', 'User not found!');
    }
    return isUserExists;
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const result = yield user_model_1.User.find();
    return result;
});
exports.userServices = {
    createUserIntoDB,
    createAdminIntoDB,
    getMe,
    getUsers,
};
