import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/app.error'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const isUserExists = await User.findOne({
    email: payload?.email,
  }).select('+password')
  if (!isUserExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found!',
      'User not found!',
    )
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  )

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Password do not matched!',
      'Password do not matched!',
    )
  }

  // create token and sent to the client

  const jwtPayload = {
    _id: isUserExists?._id,
    role: isUserExists?.role,
    email: isUserExists?.email,
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '365d',
  })

  return {
    isUserExists,
    token: accessToken,
  }
}

export const authServices = {
  loginUser,
}
