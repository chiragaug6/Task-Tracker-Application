import Joi from "joi";

// Joi schema for validating request body
export const taskValidationSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .regex(/^[a-zA-Z0-9 \-_.\,]+$/) // Letters, numbers, space, - _ . ,
    .required()
    .messages({
      "string.pattern.base":
        "Title can only contain letters, numbers, spaces, and basic punctuation (- _ . ,).",
      "string.empty": "Task title is required.",
      "string.min": "Title must be at least 3 characters long.",
      "string.max": "Title must not exceed 100 characters.",
    }),

  description: Joi.string()
    .max(1000)
    .allow("", null)
    .regex(/^[\x00-\x7F]*$/) // ASCII characters only, disallow emojis, non-ASCII
    .messages({
      "string.pattern.base":
        "Description contains invalid or non-ASCII characters.",
      "string.max": "Description must not exceed 1000 characters.",
    }),

  status: Joi.string().valid("Incomplete", "Completed").default("Incomplete"),

  priority: Joi.string().valid("Low", "Medium", "High").default("Medium"),

  dueDate: Joi.date().greater("now").optional().allow(null).messages({
    "date.greater": "Due date must be in the future.",
    "date.base": "Due date must be a valid date.",
  }),
});
