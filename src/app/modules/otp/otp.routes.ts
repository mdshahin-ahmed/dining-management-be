import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import validateData from '../../../middlewares/validateData'
import { otpControllers } from './otp.controller'
import { otpValidations } from './otp.validation'
const router = express.Router()

router.post(
  '/',
  auth(ROLE.admin, ROLE.user, ROLE.manager),
  validateData(otpValidations.otpValidationSchema),
  otpControllers.createOTPIntoDB,
)

export const otpRoute = router
