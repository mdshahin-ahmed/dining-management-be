import httpStatus from 'http-status'
import AppError from '../../errors/app.error'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import moment from 'moment'
import JwtPayloadInterface from '../../interface/jwtPayload'

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const isUserExists = await User.findOne({
    email: payload?.email,
  }).select('+password')
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Found', 'User not found!')
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  )

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Not Match',
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
    user: {
      _id: isUserExists?._id,
      name: isUserExists?.name,
      email: isUserExists?.email,
      role: isUserExists?.role,
    },
    token: accessToken,
  }
}
const getMe = async (payload: JwtPayloadInterface) => {
  // checking if the user is exist
  const isUserExists = await User.findOne({
    email: payload?.email,
  })
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Found', 'User not found!')
  }
  return {
    isUserExists,
  }
}

const changePassword = async (
  user: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const isUserExists = await User.findById(user?._id).select(
    '+password +passwordHistory +passwordChangedAt',
  )
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Found', 'User not found!')
  }

  if (payload.currentPassword === payload.newPassword) {
    const dateFormate = moment(isUserExists.passwordChangedAt).format(
      'YYYY-MM-DD [at] hh-mm A',
    )
    return {
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not the last 2 used (last used on ${dateFormate}).`,
      data: null,
    }
  }

  const currentPassword = await bcrypt.compare(
    payload?.currentPassword,
    isUserExists?.password,
  )

  if (!currentPassword) {
    const dateFormate = moment(isUserExists.passwordChangedAt).format(
      'YYYY-MM-DD [at] hh-mm A',
    )
    return {
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not the last 2 used (last used on ${dateFormate}).`,
      data: null,
    }
  }

  const newPassword = await bcrypt.compare(
    payload?.newPassword,
    isUserExists?.password,
  )

  if (newPassword) {
    const dateFormate = moment(isUserExists.passwordChangedAt).format(
      'YYYY-MM-DD [at] hh-mm A',
    )
    return {
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not the last 2 used (last used on ${dateFormate}).`,
      data: null,
    }
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  // check previous two password.
  const lastTwoPasswords = isUserExists.passwordHistory?.slice(-3)
  if (lastTwoPasswords && lastTwoPasswords?.length > 0) {
    for (const passHistory of lastTwoPasswords) {
      if (payload.newPassword === passHistory.password) {
        const dateFormate = moment(passHistory.timeStamps).format(
          'YYYY-MM-DD [at] hh-mm A',
        )

        return {
          success: false,
          statusCode: 400,
          message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${dateFormate})`, //(last used on 2023-01-01 at 12:00 PM).',
          data: null,
        }
      }
    }
  }

  const result = await User.findByIdAndUpdate(isUserExists._id, {
    $set: {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
      // passwordHistory: newHashedPassword,
    },
    $push: {
      passwordHistory: { $each: [{ password: payload.newPassword }] },
    },
  })

  return {
    success: true,
    statusCode: 200,
    message: 'Password changed successfully.',
    data: result,
  }
}

export const authServices = {
  loginUser,
  getMe,
  changePassword,
}
