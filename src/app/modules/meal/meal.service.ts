import { IMeal } from './meal.interface'
import { Meal } from './meal.model'

const createMealIntoDB = async (payload: IMeal) => {
  const result = await Meal.create(payload)
  return result
}
const getMealsFromDB = async () => {
  const result = await Meal.find()
  return result
}

export const mealServices = {
  createMealIntoDB,
  getMealsFromDB,
}
