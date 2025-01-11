import { Router } from 'express'
import { authRouter } from '../modules/auth/auth.route'
import { userRouter } from '../modules/user/user.route'
import { mealRoutes } from '../modules/meal/meal.routes'
import { orderRoutes } from '../modules/order/order.routes'
import { statementRoutes } from '../modules/statement/statement.routes'
import { balanceRoutes } from '../modules/balance/balance.routes'
import { cancelReqRoute } from '../modules/cancelreq/cancelreq.routes'
import { otpRoute } from '../modules/otp/otp.routes'
import { expenseRoutes } from '../modules/expense/expense.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/meal',
    route: mealRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/statement',
    route: statementRoutes,
  },
  {
    path: '/balance',
    route: balanceRoutes,
  },
  {
    path: '/cancel',
    route: cancelReqRoute,
  },
  {
    path: '/otp',
    route: otpRoute,
  },
  {
    path: '/expense',
    route: expenseRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
