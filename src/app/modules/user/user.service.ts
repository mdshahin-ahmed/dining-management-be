import config from '../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import bcrypt from 'bcrypt'

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

export const userServices = {
  createUserIntoDB,
  createAdminIntoDB,
}
