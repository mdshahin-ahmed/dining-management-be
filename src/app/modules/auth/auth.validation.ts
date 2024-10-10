import { z } from 'zod'

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({
      invalid_type_error: 'username must be string.',
      required_error: 'username is required.',
    }),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .min(6, { message: 'Password must be at least 6 characters long.' })
      .regex(/[a-zA-Z]/, {
        message: 'Password must contain at least one letter.',
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character.',
      }),
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
