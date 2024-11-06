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
  imageUrl: string
  role: 'admin' | 'manager' | 'user'
}

export type TRole = keyof typeof ROLE
