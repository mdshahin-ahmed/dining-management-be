import { JwtPayload } from 'jsonwebtoken'
import { ICancelReq } from './cancelreq.interface'
import { CancelReq } from './cancelreq.model'

const createCancelReqIntoDB = async (user: JwtPayload, payload: ICancelReq) => {
  const result = await CancelReq.create({ ...payload, user: user?._id })

  return result
}

export const cancelReqServices = { createCancelReqIntoDB }
