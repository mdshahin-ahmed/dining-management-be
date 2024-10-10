// import { NextFunction, Request, Response } from 'express'
// import { AnyZodObject } from 'zod'
// import catchAsync from '../app/utils/catchAsync'

// const validateData = (schema: AnyZodObject) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     await schema.parseAsync({
//       body: req.body,
//     })
//     next()
//   })
// }

// export default validateData

import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import catchAsync from '../app/utils/catchAsync'

const validateData = (schema: Joi.ObjectSchema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.validateAsync(req.body, { abortEarly: false }) // abortEarly false allows all errors to be reported
    next()
  })
}

export default validateData
