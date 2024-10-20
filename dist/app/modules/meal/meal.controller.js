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
exports.mealControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const meal_service_1 = require("./meal.service");
const http_status_1 = __importDefault(require("http-status"));
const createUserIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_service_1.mealServices.createMealIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Meal created successfully!',
        data: result,
    });
}));
const getMealsFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req === null || req === void 0 ? void 0 : req.query;
    const result = yield meal_service_1.mealServices.getMealsFromDB(type);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Meals retrieved successfully!',
        data: result,
    });
}));
const getSingleMealFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const params = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield meal_service_1.mealServices.getSingleMealFromDB(params);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Meal retrieved successfully!',
        data: result,
    });
}));
const updateMealIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const params = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const result = yield meal_service_1.mealServices.updateMealIntoDB(params, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Meal updated successfully!',
        data: result,
    });
}));
const deleteMealFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const params = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    const result = yield meal_service_1.mealServices.deleteMealFromDB(params);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.NO_CONTENT,
        message: 'Meals deleted successfully!',
        data: result,
    });
}));
exports.mealControllers = {
    createUserIntoDB,
    getMealsFromDB,
    getSingleMealFromDB,
    updateMealIntoDB,
    deleteMealFromDB,
};
