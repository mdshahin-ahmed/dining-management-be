import { JwtPayload } from 'jsonwebtoken'
import { ICancelReq } from './cancelreq.interface'
import { CancelReq } from './cancelreq.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { User } from '../user/user.model'
import AppError from '../../errors/app.error'
import httpStatus from 'http-status'

const createCancelReqIntoDB = async (user: JwtPayload, payload: ICancelReq) => {
  const isUserExists = await User.findById(user?._id)

  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    )
  }
  const result = await CancelReq.create({ ...payload, user: user?._id })

  return result
}

const getCancelRequestFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // const result = await Order.find({}).populate('user', 'name')
  // return result
  const statementQuery = new QueryBuilder(
    CancelReq.find().populate('user', ['name', 'userId']),
    query,
    user,
  )
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await statementQuery.countTotal()
  const result = await statementQuery.modelQuery

  return {
    meta,
    result,
  }
}

export const cancelReqServices = {
  createCancelReqIntoDB,
  getCancelRequestFromDB,
}
