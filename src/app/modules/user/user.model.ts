import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    // role: {
    //   type: String,
    //   enum: ['user', 'admin'],
    // },
  },
  {
    timestamps: true,
  },
)

export const User = model<IUser>('User', userSchema)
