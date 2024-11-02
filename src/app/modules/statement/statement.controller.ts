import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { statementServices } from './statement.service'

const createRechargeIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user
  const data = req?.body
  const result = await statementServices.createRechargeIntoDB(user, data)

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Recharged successfully',
    data: result,
  })
})

export const statementControllers = {
  createRechargeIntoDB,
}
