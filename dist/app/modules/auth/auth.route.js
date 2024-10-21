"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateData_1 = __importDefault(require("../../../middlewares/validateData"));
const user_controller_1 = require("../user/user.controller");
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/signup-admin', (0, auth_1.default)(user_constant_1.ROLE.admin), (0, validateData_1.default)(user_validation_1.userValidations.createAdminValidationSchema), user_controller_1.userControllers.createAdmin);
router.post('/signup', (0, validateData_1.default)(user_validation_1.userValidations.createUserValidationSchema), user_controller_1.userControllers.createUser);
router.post('/login', (0, validateData_1.default)(auth_validation_1.authValidations.loginValidationSchema), auth_controller_1.authControllers.loginUser);
// router.post(
//   '/change-password',
//   auth(ROLE.admin, ROLE.user),
//   validateData(authValidations.changePasswordValidationSchema),
//   authControllers.changePassword,
// )
exports.authRouter = router;
