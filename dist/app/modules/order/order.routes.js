"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const order_controller_1 = require("./order.controller");
const validateData_1 = __importDefault(require("../../../middlewares/validateData"));
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.ROLE.admin, user_constant_1.ROLE.user), order_controller_1.orderControllers.createOrderIntoDB);
router.get('/', (0, auth_1.default)(user_constant_1.ROLE.admin, user_constant_1.ROLE.user), order_controller_1.orderControllers.getOrdersFromDB);
router.patch('/:id', (0, auth_1.default)(user_constant_1.ROLE.admin, user_constant_1.ROLE.user), (0, validateData_1.default)(order_validation_1.orderValidations.orderStatusValidationSchema), order_controller_1.orderControllers.updateOrderStatus);
exports.orderRoutes = router;
