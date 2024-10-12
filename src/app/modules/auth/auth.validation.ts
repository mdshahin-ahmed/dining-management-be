import Joi from 'joi'
import { z } from 'zod'

const loginValidationSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).max(30).required(),
  }),
})

const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'currentPassword is required.',
    }),
    newPassword: z
      .string({
        required_error: 'newPassword is required.',
      })
      .min(6, { message: 'newPassword must be at least 6 characters long.' })
      .regex(/[a-zA-Z]/, {
        message: 'newPassword must contain at least one letter.',
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'newPassword must contain at least one special character.',
      }),
  }),
})

export const authValidations = {
  loginValidationSchema,
  changePasswordValidationSchema,
}
