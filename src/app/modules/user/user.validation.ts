import Joi from 'joi'

const createUserValidationSchema = Joi.object({
  body: Joi.object({
    name: Joi.string(),
  }),
})

export const userValidations = {
  createUserValidationSchema,
}
