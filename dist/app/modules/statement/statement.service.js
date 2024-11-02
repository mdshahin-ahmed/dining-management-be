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
exports.statementServices = void 0;
const mongoose_1 = require("mongoose");
const app_error_1 = __importDefault(require("../../errors/app.error"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const statement_model_1 = require("./statement.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const statement_constant_1 = require("./statement.constant");
const createRechargeIntoDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        const result = yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            // check user exist
            const isUserExists = yield user_model_1.User.findById(user === null || user === void 0 ? void 0 : user._id).session(session);
            if (!isUserExists) {
                throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'User not found', 'User not found!');
            }
            if ((payload === null || payload === void 0 ? void 0 : payload.amount) <= 0) {
                throw new app_error_1.default(http_status_1.default.NOT_FOUND, 'Amount should be positive number2', 'Amount should be positive number');
            }
            // Add balance
            const addBalance = yield user_model_1.User.findByIdAndUpdate(isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id, {
                balance: (isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.balance) + (payload === null || payload === void 0 ? void 0 : payload.amount),
            }, { session, new: true });
            if (!(addBalance === null || addBalance === void 0 ? void 0 : addBalance.balance)) {
                throw new app_error_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Can't add Balance", "Can't add balance");
            }
            const data = {
                user: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists._id,
                type: payload === null || payload === void 0 ? void 0 : payload.type,
                mobile: payload === null || payload === void 0 ? void 0 : payload.mobile,
                amount: payload === null || payload === void 0 ? void 0 : payload.amount,
                transactionNumber: payload === null || payload === void 0 ? void 0 : payload.transactionNumber,
                prevBalance: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.balance,
                newBalance: addBalance === null || addBalance === void 0 ? void 0 : addBalance.balance,
            };
            const statement = yield statement_model_1.Statement.create([data], { session });
            return statement[0];
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
const getStatementsFromDB = (query, user) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Order.find({}).populate('user', 'name')
    // return result
    const statementQuery = new QueryBuilder_1.default(statement_model_1.Statement.find().populate('user', 'name'), query, user)
        .search(statement_constant_1.statementSearchableFields)
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
exports.statementServices = { createRechargeIntoDB, getStatementsFromDB };
