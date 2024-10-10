import { ZodError, ZodIssue } from 'zod'

const handleJoiError = (err: ZodError) => {
  const errorMessages = err.issues.map((issue: ZodIssue) => issue.message)
  const concatMessages = errorMessages.join(' ')

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessage: concatMessages,
    errorDetails: err,
  }
}

export default handleJoiError
