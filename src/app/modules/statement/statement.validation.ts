import Joi from 'joi'

const RechargeBalanceSchema = Joi.object({
  body: {
    type: Joi.string().valid('bkash', 'nagad').required().messages({
      'string.base': 'Payment method must be a text',
      'any.only': 'Payment method must be one of bkash or nagad',
      'any.required': 'Payment method is required.',
    }),
    mobile: Joi.string()
      .length(11)
      .pattern(/^01\d+$/)
      .required()
      .messages({
        'string.length': 'Please provide a valid number',
        'string.pattern.base': 'Please provide a valid number',
        'any.required': 'Mobile number is required.',
      }),
    amount: Joi.number()
      .positive() // Balance should be a positive number
      .required()
      .messages({
        'number.base': 'Balance must be a number',
        'number.positive': 'Balance must be a positive number',
        'any.required': 'Balance is required',
      }),
    transactionNumber: Joi.string().required().messages({
      'string.base': 'Transaction number is required',
      'any.required': 'Transaction number is required',
    }),
  },
})

const statementStatusValidationSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().valid('approved').required().messages({
      'any.only': 'Status must be approved',
      'any.required': 'Status is required',
    }),
  }),
})

export const statementValidations = {
  RechargeBalanceSchema,
  statementStatusValidationSchema,
}
