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
exports.orderServices = void 0;
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const app_error_1 = __importDefault(require("../../errors/app.error"));
const meal_model_1 = require("../meal/meal.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findOne({
        email: user === null || user === void 0 ? void 0 : user.email,
    });
    if (!isUserExists) {
        throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'User not found', 'User not found!');
    }
    const isMealExist = yield meal_model_1.Meal.findById(id);
    if (!isMealExist) {
        throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'Meal not found', 'Meal not found!');
    }
    const data = {
        user: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id,
        name: isMealExist === null || isMealExist === void 0 ? void 0 : isMealExist.name,
        description: isMealExist === null || isMealExist === void 0 ? void 0 : isMealExist.description,
        price: isMealExist === null || isMealExist === void 0 ? void 0 : isMealExist.price,
        type: isMealExist === null || isMealExist === void 0 ? void 0 : isMealExist.type,
    };
    const result = yield order_model_1.Order.create(data);
    return result;
});
exports.orderServices = { createOrderIntoDB };
