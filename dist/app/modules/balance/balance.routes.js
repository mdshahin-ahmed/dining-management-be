"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const validateData_1 = __importDefault(require("../../../middlewares/validateData"));
const balance_validation_1 = require("./balance.validation");
const balance_controller_1 = require("./balance.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.ROLE.admin), (0, validateData_1.default)(balance_validation_1.balanceValidations.addBalanceValidationSchema), balance_controller_1.balanceController.addBalanceIntoDB);
router.get('/', (0, auth_1.default)(user_constant_1.ROLE.admin, user_constant_1.ROLE.user), balance_controller_1.balanceController.getBalanceFromDB);
exports.balanceRoutes = router;
