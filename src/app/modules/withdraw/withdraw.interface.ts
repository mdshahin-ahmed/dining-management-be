import { Types } from 'mongoose'

export interface IWithdraw {
  user: Types.ObjectId
  amount: number
  reason: string
  status: 'pending' | 'approved' | 'canceled'
}
