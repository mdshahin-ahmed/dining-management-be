import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    hostel: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<IUser>('User', userSchema)
