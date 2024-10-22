import { JwtPayload } from 'jsonwebtoken'
import { User } from '../user/user.model'
import httpStatus from 'http-status'
import AppError from '../../errors/app.error'
import { Meal } from '../meal/meal.model'
import { Order } from './order.model'

const createOrderIntoDB = async (user: JwtPayload, id: string) => {
  const isUserExists = await User.findOne({
    email: user?.email,
  })
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    )
  }
  const isMealExist = await Meal.findById(id)
  if (!isMealExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Meal not found',
      'Meal not found!',
    )
  }

  const data = {
    user: isUserExists?._id,
    name: isMealExist?.name,
    description: isMealExist?.description,
    price: isMealExist?.price,
    type: isMealExist?.type,
  }

  const result = await Order.create(data)

  return result
}

export const orderServices = { createOrderIntoDB }
