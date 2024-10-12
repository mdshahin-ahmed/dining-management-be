import Joi from 'joi'

const createUserValidationSchema = Joi.object({
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
        'any.required': 'Input is required.',
      }),
    hostel: Joi.string().min(3).max(30).required(),
    room: Joi.string().min(1).max(4).required(),
    password: Joi.string().min(5).max(30).required(),
  }),
})

export const userValidations = {
  createUserValidationSchema,
}
