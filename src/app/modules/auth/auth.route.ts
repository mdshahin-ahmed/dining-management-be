import express from 'express'
import validateData from '../../../middlewares/validateData'
import { userControllers } from '../user/user.controller'
import { userValidations } from '../user/user.validation'
import { authValidations } from './auth.validation'
import { authControllers } from './auth.controller'
const router = express.Router()

router.post(
  '/register-admin',
  validateData(userValidations.createUserValidationSchema),
  userControllers.createAdmin,
)
router.post(
  '/register',
  validateData(userValidations.createUserValidationSchema),
  userControllers.createUser,
)

router.post(
  '/login',
  validateData(authValidations.loginValidationSchema),
  authControllers.loginUser,
)
// router.post(
//   '/change-password',
//   auth(ROLE.admin, ROLE.user),
//   validateData(authValidations.changePasswordValidationSchema),
//   authControllers.changePassword,
// )

export const authRouter = router
