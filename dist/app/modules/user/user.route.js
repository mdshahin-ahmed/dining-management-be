"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const user_controller_1 = require("./user.controller");
const validateData_1 = __importDefault(require("../../../middlewares/validateData"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get('/me', (0, auth_1.default)(user_constant_1.ROLE.admin, user_constant_1.ROLE.user, user_constant_1.ROLE.manager), user_controller_1.userControllers.getMe);
router.get('/all', (0, auth_1.default)(user_constant_1.ROLE.admin), user_controller_1.userControllers.getUsers);
router.patch('/add-balance', (0, auth_1.default)(user_constant_1.ROLE.admin), (0, validateData_1.default)(user_validation_1.userValidations.addBalanceSchema), user_controller_1.userControllers.addBalance);
exports.userRouter = router;
