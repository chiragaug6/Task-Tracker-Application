import AppError from "./error.js";
import { registerSchema } from "../validators/userValidator.js";

export const validateRegisterData = (data) => {
  // Validate data against Joi schema
  const { error, value } = registerSchema.validate(data, {
    abortEarly: true, // Stop at the first validation error
    stripUnknown: true, // Remove unknown fields not defined in schema
  });

  // If validation fails, throw an error with message
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  // Return the cleaned and validated data
  return value;
};
