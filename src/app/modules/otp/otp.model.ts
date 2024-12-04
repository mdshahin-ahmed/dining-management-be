import { model, Schema } from 'mongoose'
import { IOtp } from './otp.interface'

const otpSchema = new Schema<IOtp>({
  email: {
    type: String,
    required: true,
  },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // OTP will expire in 5 minutes
  },
})

export const Otp = model<IOtp>('otp', otpSchema)
