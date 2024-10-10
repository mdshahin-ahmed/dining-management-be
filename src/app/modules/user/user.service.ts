import config from '../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import bcrypt from 'bcrypt'

const createUserIntoDB = async (payload: IUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  )

  const result = await User.create(payload)

  return {
    username: result.username,
    email: result.email,
    role: result.role,
    _id: result._id,
  }
}

export const userServices = {
  createUserIntoDB,
}
