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

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getMe(req.user)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User retrieved successfully!',
    data: result,
  })
})
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getUsers(req?.query)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Users retrieved successfully!',
    data: result,
  })
})
const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user
  const data = req?.body
  const result = await userServices.updateUserProfile(user, data)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Profile updated successfully!',
    data: result,
  })
})

export const userControllers = {
  createUser,
  createAdmin,
  getMe,
  getUsers,
  updateUserProfile,
}
