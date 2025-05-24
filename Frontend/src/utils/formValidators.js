import validator from "validator";

export function validateLoginForm({ email, password }) {
  const errors = {};

  // Email
  if (!email) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  // Password
  if (!password) {
    errors.password = "Password is required";
  } else if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    errors.password =
      "Password must include uppercase, lowercase, number, and special character";
  }

  return errors;
}

export function validateRegisterForm({ name, email, password }) {
  const errors = {};

  // Name
  if (!name.trim()) {
    errors.name = "Name is required";
  } else if (
    !validator.isAlpha(validator.blacklist(name, " "), "en-US", {
      ignore: " ",
    }) ||
    name.length < 2 ||
    name.length > 50
  ) {
    errors.name = "Name must be 2-50 characters and contain only letters";
  }

  // Email
  if (!email) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  // Password
  if (!password) {
    errors.password = "Password is required";
  } else if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    errors.password =
      "Password must include uppercase, lowercase, number, and special character";
  }

  return errors;
}

export const validateTaskForm = (formData) => {
  const errors = {};

  // Title: required, min 3, max 100, alphanumeric with basic punctuation
  const title = formData.title?.trim();
  if (!title) {
    errors.title = "Title is required.";
  } else if (title.length < 3) {
    errors.title = "Title must be at least 3 characters long.";
  } else if (title.length > 100) {
    errors.title = "Title must not exceed 100 characters.";
  } else if (!/^[a-zA-Z0-9\s\-_.,]+$/.test(title)) {
    errors.title = "Title contains invalid characters.";
  }

  // Description: optional, max 1000, ASCII only
  const description = formData.description?.trim();
  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length > 1000) {
    errors.description = "Description must not exceed 1000 characters.";
  } else if (!/^[\x00-\x7F]*$/.test(description)) {
    errors.description = "Description contains invalid characters.";
  }

  // Due Date: must be in future (if provided)
  if (formData.dueDate) {
    const dueDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dueDate <= today) {
      errors.dueDate = "Due date must be in the future.";
    }
  }

  return errors;
};
