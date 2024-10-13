"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../app/utils/catchAsync"));
const validateData = (schema) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Perform Joi validation on req.body
        yield schema.validateAsync({ body: req.body }, { abortEarly: false }); // Collect all validation errors
        next(); // Proceed to the next middleware if validation passes
    }));
};
exports.default = validateData;
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
