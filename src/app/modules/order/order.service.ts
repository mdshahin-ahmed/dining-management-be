/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken'
import { User } from '../user/user.model'
import httpStatus from 'http-status'
import AppError from '../../errors/app.error'
import { Meal } from '../meal/meal.model'
import { Order } from './order.model'
import { startSession } from 'mongoose'

const createOrderIntoDB = async (user: JwtPayload, id: string) => {
  const session = await startSession()

  try {
    const result = await session.withTransaction(async () => {
      // check user exist
      const isUserExists = await User.findOne({
        email: user?.email,
      }).session(session)
      if (!isUserExists) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'User not found',
          'User not found!',
        )
      }

      // check meal exist
      const isMealExist = await Meal.findById(id).session(session)
      if (!isMealExist) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Meal not found',
          'Meal not found!',
        )
      }

      // balance check
      if (isUserExists?.balance < isMealExist?.price) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'You have no enough balance!',
          'You have no enough balance!. Please Recharge',
        )
      }

      // Cut balance

      await User.findOneAndUpdate(
        isUserExists?._id,
        {
          balance: isUserExists?.balance - isMealExist?.price,
        },
        { session, new: true },
      )

      // data
      const data = {
        user: isUserExists?._id,
        name: isMealExist?.name,
        description: isMealExist?.description,
        price: isMealExist?.price,
        type: isMealExist?.type,
      }

      const orderResult = await Order.create([data], { session })
      return orderResult[0]
    })
    return result
  } catch (error: any) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error?.message || 'Order Failed',
      error?.errorMessage || 'Order Failed',
    )
  } finally {
    session.endSession()
  }
}

export const orderServices = { createOrderIntoDB }
