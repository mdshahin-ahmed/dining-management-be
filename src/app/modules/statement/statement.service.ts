/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken'
import { IStatement } from './statement.interface'
import { startSession } from 'mongoose'
import AppError from '../../errors/app.error'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { Statement } from './statement.model'

const createRechargeIntoDB = async (user: JwtPayload, payload: IStatement) => {
  const session = await startSession()

  try {
    const result = await session.withTransaction(async () => {
      // check user exist
      const isUserExists = await User.findById(user?._id).session(session)

      if (!isUserExists) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'User not found',
          'User not found!',
        )
      }

      if (payload?.amount <= 0) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Amount should be positive number2',
          'Amount should be positive number',
        )
      }

      // Add balance
      await User.findOneAndUpdate(
        isUserExists?._id,
        {
          balance: isUserExists?.balance + payload?.amount,
        },
        { session, new: true },
      )

      const data = {
        type: payload?.type,
        mobile: payload?.mobile,
        amount: payload?.amount,
        transactionNumber: payload?.transactionNumber,
        name: isUserExists?.name,
        prevBalance: isUserExists?.balance,
        newBalance: isUserExists?.balance + payload?.amount,
      }

      const statement = await Statement.create([data], { session })
      return statement[0]
    })
    return result
  } catch (error: any) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Recharge Failed',
      error?.errorMessage || 'Recharge Failed',
    )
  } finally {
    session.endSession()
  }
}

export const statementServices = { createRechargeIntoDB }
