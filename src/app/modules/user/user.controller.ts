import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userServices } from './user.service'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createUserIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  })
})
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createAdminIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Admin registered successfully',
    data: result,
  })
})

export const userControllers = {
  createUser,
  createAdmin,
}
