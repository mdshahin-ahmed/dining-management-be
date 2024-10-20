import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { mealServices } from './meal.service'

const createUserIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await mealServices.createMealIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Meal created successfully!',
    data: result,
  })
})
const getMealsFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await mealServices.getMealsFromDB()
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Meals retrieved successfully!',
    data: result,
  })
})

export const mealControllers = { createUserIntoDB, getMealsFromDB }
