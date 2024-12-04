import { model, Schema } from 'mongoose'
import { IOtp } from './otp.interface'

const otpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
    },
    opt: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export const Otp = model<IOtp>('otp', otpSchema)
