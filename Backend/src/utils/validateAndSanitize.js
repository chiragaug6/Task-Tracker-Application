import AppError from "./error.js";
import { registerSchema } from "../validators/userValidator.js";
import { taskValidationSchema } from "../validators/taskValidator.js";

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

export const validateTaskData = (data, partial = false) => {
  // If partial = true, make all fields optional
  const schema = partial
    ? taskValidationSchema.optional() // Makes entire schema optional
    : taskValidationSchema; // Full validation for create

  const { error, value } = schema.validate(data, {
    abortEarly: true, // Stop on the first error
    stripUnknown: true, // Remove extra fields not in schema
  });

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  return value;
};
