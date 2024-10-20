"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleJoiError = (err) => {
    // Extract error messages from Joi details
    const errorMessages = err.details.map((detail) => detail.message);
    const formattedErrors = errorMessages
        .map((error) => {
        var _a;
        // Extract the key (e.g., name, email, etc.)
        const key = (_a = error.match(/"([^"]+)"/)) === null || _a === void 0 ? void 0 : _a[1];
        if (key) {
            // Capitalize the first letter of the key
            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            // Replace the original key in the message with the capitalized key
            return error.replace(`"${key}"`, capitalizedKey);
        }
        return error;
    })
        .join('. ');
    return {
        statusCode: 400,
        message: 'Please Provide Valid Information',
        errorMessage: formattedErrors,
        errorDetails: err,
    };
};
exports.default = handleJoiError;
// import { ZodError, ZodIssue } from 'zod'
// const handleJoiError = (err: ZodError) => {
//   const errorMessages = err.issues.map((issue: ZodIssue) => issue.message)
//   const concatMessages = errorMessages.join(' ')
//   return {
//     statusCode: 400,
//     message: 'Validation Error',
//     errorMessage: concatMessages,
//     errorDetails: err,
//   }
// }
// export default handleJoiError
