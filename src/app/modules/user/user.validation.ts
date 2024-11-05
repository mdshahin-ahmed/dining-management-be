import Joi from 'joi'

// const createUserValidationSchema = Joi.object({
//   body: Joi.object({
//     name: Joi.string().min(3).max(30).required(),
//     email: Joi.string()
//       .email({ tlds: { allow: false } })
//       .required(),
//     mobile: Joi.string()
//       .length(11)
//       .pattern(/^01\d+$/)
//       .required()
//       .messages({
//         'string.length': 'Please provide a valid number',
//         'string.pattern.base': 'Please provide a valid number',
//         'any.required': 'Mobile number is required.',
//       }),
//     hostel: Joi.string().min(3).max(30).required(),
//     room: Joi.string().min(1).max(4).required(),
//     password: Joi.string().min(5).max(30).required(),
//   }),
// })
const createAdminValidationSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    mobile: Joi.string()
      .length(11)
      .pattern(/^01\d+$/)
      .required()
      .messages({
        'string.length': 'Please provide a valid number',
        'string.pattern.base': 'Please provide a valid number',
        'any.required': 'Mobile number is required.',
      }),
    hostel: Joi.string().min(3).max(30).required(),
    room: Joi.string().min(1).max(4).required(),
    password: Joi.string().min(5).max(30).required(),
    userId: Joi.string().required(),
    role: Joi.string().valid('admin', 'manager', 'user').required().messages({
      'string.base': 'Role must be a text.',
      'any.only': 'Role must be one of admin or manager or user',
      'any.required': 'Role is required.',
    }),
  }),
})

export const userValidations = {
  createAdminValidationSchema,
}
