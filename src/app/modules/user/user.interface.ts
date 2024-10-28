import { ROLE } from './user.constant'

export interface IUser {
  name: string
  email: string
  mobile: string
  hostel: string
  room: string
  password: string
  balance: number
  userId: string
  role: 'user' | 'admin'
}

export type TRole = keyof typeof ROLE
