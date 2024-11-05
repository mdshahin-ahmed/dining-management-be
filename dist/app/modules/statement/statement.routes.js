"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statementRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const validateData_1 = __importDefault(require("../../../middlewares/validateData"));
const statement_validation_1 = require("./statement.validation");
const statement_controller_1 = require("./statement.controller");
const router = express_1.default.Router();
router.post('/recharge', (0, auth_1.default)(user_constant_1.ROLE.admin, user_constant_1.ROLE.user), (0, validateData_1.default)(statement_validation_1.statementValidations.RechargeBalanceSchema), statement_controller_1.statementControllers.createRechargeIntoDB);
router.get('/', (0, auth_1.default)(user_constant_1.ROLE.admin, user_constant_1.ROLE.user), statement_controller_1.statementControllers.getStatementsFromDB);
router.patch('/:id', (0, auth_1.default)(user_constant_1.ROLE.admin, user_constant_1.ROLE.user, user_constant_1.ROLE.manager), (0, validateData_1.default)(statement_validation_1.statementValidations.statementStatusValidationSchema), statement_controller_1.statementControllers.updateStatementStatus);
exports.statementRoutes = router;
