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
exports.orderControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_service_1 = require("./order.service");
const createOrderIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = req === null || req === void 0 ? void 0 : req.user;
    const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield order_service_1.orderServices.createOrderIntoDB(user, id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Order created successfully',
        data: result,
    });
}));
const getOrdersFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield order_service_1.orderServices.getOrdersFromDB(query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Order retrieved successfully',
        data: result,
    });
}));
const updateOrderStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    const status = req.body;
    const result = yield order_service_1.orderServices.updateOrderStatus(id, status);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Order updated successfully',
        data: result,
    });
}));
exports.orderControllers = {
    createOrderIntoDB,
    getOrdersFromDB,
    updateOrderStatus,
};
