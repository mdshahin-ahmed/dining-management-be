import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/app.error'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (payload: IUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  )

  const result = await User.create({ ...payload, role: 'user' })

  return {
    username: result.name,
    email: result.email,
    role: result.role,
    _id: result._id,
  }
}
const createAdminIntoDB = async (payload: IUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  )

  const result = await User.create({ ...payload, role: 'admin' })

  return {
    username: result.name,
    email: result.email,
    role: result.role,
    _id: result._id,
  }
}

const getMe = async (payload: JwtPayload) => {
  // checking if the user is exist
  const isUserExists = await User.findOne({
    email: payload?.email,
  })
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'User not found!',
    )
  }
  return isUserExists
}

export const userServices = {
  createUserIntoDB,
  createAdminIntoDB,
  getMe,
}
