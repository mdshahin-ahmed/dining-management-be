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
exports.mealServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const app_error_1 = __importDefault(require("../../errors/app.error"));
const meal_model_1 = require("./meal.model");
const createMealIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.Meal.create(payload);
    return result;
});
const getMealsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.Meal.find();
    return result;
});
const getSingleMealFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.Meal.findById(id);
    if (!result) {
        throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'Meal Not Found', 'Meal Not Found');
    }
    return result;
});
const updateMealIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.Meal.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'Meal Not Found', 'Meal Not Found');
    }
    return result;
});
const deleteMealFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.Meal.findByIdAndDelete(id);
    if (!result) {
        throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'Meal Not Found', 'Meal Not Found');
    }
    return null;
});
exports.mealServices = {
    createMealIntoDB,
    getMealsFromDB,
    getSingleMealFromDB,
    updateMealIntoDB,
    deleteMealFromDB,
};
