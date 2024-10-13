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

export const authControllers = {
  loginUser,
}
