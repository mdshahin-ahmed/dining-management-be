import Joi from 'joi'

const createWithdrawReqValidationSchema = Joi.object({
  body: Joi.object({
    amount: Joi.number().required(),
  }),
})

// const cancelReqStatusValidationSchema = Joi.object({
//   body: Joi.object({
//     status: Joi.string()
//       .valid('approved', 'canceled', 'pending')
//       .required()
//       .messages({
//         'any.only': 'Status must be approved or canceled or pending',
//         'any.required': 'Status is required',
//       }),
//   }),
// })

export const withdrawValidations = {
  createWithdrawReqValidationSchema,
  // cancelReqStatusValidationSchema,
}
