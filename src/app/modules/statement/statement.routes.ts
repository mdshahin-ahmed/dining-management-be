import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import validateData from '../../../middlewares/validateData'
import { statementValidations } from './statement.validation'
import { statementControllers } from './statement.controller'
const router = express.Router()

router.post(
  '/recharge',
  auth(ROLE.admin),
  validateData(statementValidations.RechargeBalanceSchema),
  statementControllers.createRechargeIntoDB,
)

export const statementRoutes = router
