import { ROLE } from './user.constant'

export interface IUser {
  name: string

  // password: string
  // role: 'user' | 'admin'
}

export type TRole = keyof typeof ROLE
