import Joi from 'joi'

const loginValidationSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).max(30).required(),
  }),
})

const changePasswordValidationSchema = Joi.object({
  body: Joi.object({
    oldPass: Joi.string().min(5).max(30),
    newPass: Joi.string().min(5).max(30),
  }),
})

const updatePasswordValidationSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).max(30).required(),
    otp: Joi.string().length(6),
  }),
})

export default changePasswordValidationSchema

export const authValidations = {
  loginValidationSchema,
  changePasswordValidationSchema,
  updatePasswordValidationSchema,
}
