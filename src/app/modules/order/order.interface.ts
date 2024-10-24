import { Types } from 'mongoose'

export interface IOrder {
  user: Types.ObjectId
  name: string
  uId: string
  description: string
  price: number
  type: string
  status: 'pending' | 'approved' | 'canceled'
}
