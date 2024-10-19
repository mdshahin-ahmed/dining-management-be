import { Router } from 'express'
import { authRouter } from '../modules/auth/auth.route'
import { userRouter } from '../modules/user/user.route'
import { mealRoutes } from '../modules/meal/meal.routes'

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
