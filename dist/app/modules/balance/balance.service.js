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
exports.balanceServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const app_error_1 = __importDefault(require("../../errors/app.error"));
const user_model_1 = require("../user/user.model");
const balance_model_1 = require("./balance.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const balance_constant_1 = require("./balance.constant");
const addBalanceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        const result = yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            // check user exist
            const isUserExists = yield user_model_1.User.findById(payload === null || payload === void 0 ? void 0 : payload.id).session(session);
            if (!isUserExists) {
                throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'User not found', 'User not found!');
            }
            if ((payload === null || payload === void 0 ? void 0 : payload.amount) <= 0) {
                throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'Amount should be positive number2', 'Amount should be positive number');
            }
            if ((payload === null || payload === void 0 ? void 0 : payload.amount) < 50) {
                throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'Amount must be at least 50', 'Amount must be at least 50');
            }
            // Add balance
            const addBalance = yield user_model_1.User.findByIdAndUpdate(isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id, {
                balance: Number(isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.balance) + Number(payload === null || payload === void 0 ? void 0 : payload.amount),
            }, { session, new: true });
            if (!(addBalance === null || addBalance === void 0 ? void 0 : addBalance.balance)) {
                throw new app_error_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Can't add Balance", "Can't add balance");
            }
            const data = {
                user: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id,
                amount: payload === null || payload === void 0 ? void 0 : payload.amount,
                prevBalance: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.balance,
                newBalance: addBalance === null || addBalance === void 0 ? void 0 : addBalance.balance,
            };
            const balance = yield balance_model_1.Balance.create([data], { session });
            return balance[0];
        }));
        return result;
    }
    catch (error) {
        throw new app_error_1.default(http_status_1.default.BAD_REQUEST, (error === null || error === void 0 ? void 0 : error.message) || 'Recharge Failed', (error === null || error === void 0 ? void 0 : error.errorMessage) || 'Recharge Failed');
    }
    finally {
        session.endSession();
    }
});
const getBalanceFromDB = (query, user) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Order.find({}).populate('user', 'name')
    // return result
    const statementQuery = new QueryBuilder_1.default(balance_model_1.Balance.find().populate('user', 'name'), query, user)
        .search(balance_constant_1.balanceSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield statementQuery.countTotal();
    const result = yield statementQuery.modelQuery;
    return {
        meta,
        result,
    };
});
exports.balanceServices = {
    addBalanceIntoDB,
    getBalanceFromDB,
};
