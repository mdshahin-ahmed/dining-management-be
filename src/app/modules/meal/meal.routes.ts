import express from 'express'
import auth from '../../../middlewares/auth'
import { ROLE } from '../user/user.constant'
import { mealControllers } from './meal.controller'
import validateData from '../../../middlewares/validateData'
import { mealValidations } from './meal.validation'
const router = express.Router()

router.post(
  '/',
  auth(ROLE.admin),
  validateData(mealValidations.createMealValidationSchema),
  mealControllers.createUserIntoDB,
)
router.get('/', auth(ROLE.admin), mealControllers.getMealsFromDB)

export const mealRoutes = router
