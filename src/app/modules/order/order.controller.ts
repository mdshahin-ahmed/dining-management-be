import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { orderServices } from './order.service'

const createOrderIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user
  const id = req?.query?.id as string
  const result = await orderServices.createOrderIntoDB(user, id)
  console.log('From controller', result)

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Order created successfully',
    data: result,
  })
})

export const orderControllers = { createOrderIntoDB }
