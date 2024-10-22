import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import { orderControllers } from './order.controller'
const router = express.Router()

router.post(
  '/',
  auth(ROLE.admin, ROLE.user),
  orderControllers.createOrderIntoDB,
)
router.get('/', auth(ROLE.admin, ROLE.user), orderControllers.getOrdersFromDB)

export const orderRoutes = router
