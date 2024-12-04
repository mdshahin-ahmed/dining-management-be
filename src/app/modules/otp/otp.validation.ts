import Joi from 'joi'

const otpValidationSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  }),
})

export const otpValidations = { otpValidationSchema }
