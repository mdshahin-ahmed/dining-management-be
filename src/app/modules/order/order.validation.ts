import Joi from 'joi'

const orderStatusValidationSchema = Joi.object({
  body: Joi.object({
    status: Joi.string()
      .valid('delivered', 'canceled', 'pending')
      .required()
      .messages({
        'any.only': 'Status must be one of pending, delivered, or canceled',
        'any.required': 'Status is required',
      }),
  }),
})

export const orderValidations = {
  orderStatusValidationSchema,
}
