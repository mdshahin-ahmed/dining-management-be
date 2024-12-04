import httpStatus from 'http-status'
import AppError from '../../errors/app.error'
import { User } from '../user/user.model'
import { Otp } from './otp.model'
import { sendEmail } from '../../utils/sendEmail'

const createOTPIntoDB = async (payload: { email: string }) => {
  const isUserExists = await User.findOne({ email: payload?.email })

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Wrong email!', 'User not found!')
  }
  const otp = Math.floor(100000 + Math.random() * 900000)
  await Otp.findOneAndUpdate(
    { email: payload?.email }, // Match the email
    { otp: otp, createdAt: Date.now() }, // Update OTP and reset the creation time
    { upsert: true, new: true }, // Create new if not found and return the updated document
  )

  sendEmail(
    payload?.email,
    `<!DOCTYPE html>
        <html>
        <head>
          <!-- Include the above HTML template content -->          
        </head>
        <body>
          <div class="container">
            <div>
              <h2>Welcome to Our Service!</h2>
            </div>
            <div>
              <h3>This otp will be expired after 10 minutes! Hurry up!!!</h3>
              <h4>Please enter this OTP: ${otp}</h4>
            </div>
          </div>
        </body>
        </html>
      `,
  )

  return null
}

const verifyOtp = async (payload: { email: string; otp: string }) => {
  const isUserExists = await User.findOne({ email: payload?.email })

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Wrong email!', 'User not found!')
  }

  return null
}

export const otpServices = { createOTPIntoDB, verifyOtp }
