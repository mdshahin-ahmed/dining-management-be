/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken'
import { User } from '../user/user.model'
import httpStatus from 'http-status'
import AppError from '../../errors/app.error'
import { Meal } from '../meal/meal.model'
import { Order } from './order.model'
import { startSession } from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { ordersSearchableFields } from './order.constant'

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
      if (isMealExist?.price < 1) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Price should be grater then 0',
          'Price should be grater then 0',
        )
      }

      if (isMealExist?.stock < 1) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Stock Out',
          'No meal available',
        )
      }

      if (isUserExists?.balance < isMealExist?.price) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'You have no enough balance!',
          'You have no enough balance!. Please Recharge',
        )
      }

      // Decrease quantity

      await Meal.findByIdAndUpdate(
        isMealExist?._id,
        {
          stock: isMealExist?.stock - 1,
        },
        { session, new: true },
      )

      // Cut balance

      await User.findOneAndUpdate(
        isUserExists?._id,
        {
          balance: isUserExists?.balance - isMealExist?.price,
        },
        { session, new: true },
      )

      // Find the last order to generate uId
      const lastOrder = await Order.findOne()
        .sort({ createdAt: -1 })
        .select('uId')
        .session(session)

      const newUId = lastOrder ? Number(lastOrder.uId) + 1 : 1

      // data
      const data = {
        user: isUserExists?._id,
        name: isMealExist?.name,
        description: isMealExist?.description,
        price: isMealExist?.price,
        type: isMealExist?.type,
        uId: newUId,
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

const getOrdersFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // const result = await Order.find({}).populate('user', 'name')
  // return result
  const ordersQuery = new QueryBuilder(
    Order.find().populate('user', 'name'),
    query,
    user,
  )
    .search(ordersSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await ordersQuery.countTotal()
  const result = await ordersQuery.modelQuery

  return {
    meta,
    result,
  }
}
const updateOrderStatus = async (id: string, status: { status: string }) => {
  const isMealExist = await Order.findById(id)
  if (!isMealExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Order not found',
      'Order not found!',
    )
  }

  const result = await Order.findByIdAndUpdate(id, status, {
    new: true,
  })
  return result
}

export const orderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
  updateOrderStatus,
}
