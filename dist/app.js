"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const routeNotFound_1 = __importDefault(require("./middlewares/routeNotFound"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to our database!',
    });
});
// route not found
app.use(routeNotFound_1.default);
// global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
