import Joi from 'joi'

const otpValidationSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  }),
})
const verifyOtpValidationSchema = Joi.object({
  body: Joi.object({
    otp: Joi.string().length(6),
  }),
})

export const otpValidations = { otpValidationSchema, verifyOtpValidationSchema }
