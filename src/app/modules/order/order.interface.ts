import { Types } from 'mongoose'

export interface IOrder {
  user: Types.ObjectId
  name: string
  description: string
  price: number
  type: string
  status: 'pending' | 'approved' | 'canceled'
}
