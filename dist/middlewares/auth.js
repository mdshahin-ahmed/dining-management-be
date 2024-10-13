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
const catchAsync_1 = __importDefault(require("../app/utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const app_error_1 = __importDefault(require("../app/errors/app.error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../app/config"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // if the token is send from the client
        if (!token) {
            throw new app_error_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access.', 'You do not have the necessary permissions to access this resource.');
        }
        // check if the token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const role = decoded.role;
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new app_error_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access.', 'You do not have the necessary permissions to access this resource.');
        }
        // decoded
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
