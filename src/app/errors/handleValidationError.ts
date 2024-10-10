import mongoose from 'mongoose'

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  return {
    message: 'Validation Error mon',
    errorMessage: err.message,
    errorDetails: err,
  }
}

export default handleValidationError
