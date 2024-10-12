import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authServices } from './auth.service'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User login successfully!',
    data: result,
  })
})
const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.getMe(req.user)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User retrieved successfully!',
    data: result,
  })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body

  const result = await authServices.changePassword(req.user, passwordData)

  const { statusCode } = result

  res.status(statusCode).json(result)
  // sendResponse(res, result)
})

export const authControllers = {
  loginUser,
  getMe,
  changePassword,
}
