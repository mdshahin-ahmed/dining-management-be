import express from 'express'
import validateData from '../../../middlewares/validateData'
import { userControllers } from '../user/user.controller'
import { userValidations } from '../user/user.validation'
const router = express.Router()

router.post(
  '/register',
  validateData(userValidations.createUserValidationSchema),
  userControllers.createUser,
)

// router.post(
//   '/login',
//   validateData(authValidations.loginValidationSchema),
//   authControllers.loginUser,
// )
// router.post(
//   '/change-password',
//   auth(ROLE.admin, ROLE.user),
//   validateData(authValidations.changePasswordValidationSchema),
//   authControllers.changePassword,
// )

export const authRouter = router
