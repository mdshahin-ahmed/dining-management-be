import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { cancelReqServices } from './cancelreq.service'
import sendResponse from '../../utils/sendResponse'

const createCancelReq = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  const result = await cancelReqServices.createCancelReqIntoDB(user, req.body)
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Cancel request added successfully',
    data: result,
  })
})

export const cancelReqControllers = {
  createCancelReq,
}
