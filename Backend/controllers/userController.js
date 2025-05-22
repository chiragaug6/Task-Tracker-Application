import userModel from "../models/userModel.js";
import AppError from "../utils/error.js";
import { validateRegisterData } from "../utils/validateAndSanitize.js";
import { cookieOptions } from "../utils/constant.js";

/**
 * @desc    Register a new user
 * @route   POST /api/v1/user/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    // Validate and sanitize user input (name, email, password)
    const { name, email, password } = validateRegisterData(req.body);

    // Check if a user already exists with the given email
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return next(new AppError("Email is already registered", 400));
    }

    // Create a new user (password is hashed via pre-save hook in userModel)
    const user = await userModel.create({ name, email, password });

    // Exclude password field from the response
    user.password = undefined;

    // Send success response with the new user's data
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    // Forward errors to the global error handler
    next(err);
  }
};

/**
 * @desc    Log in user and issue authentication token
 * @route   POST /api/v1/user/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    // Find user by email and explicitly include password field
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Compare provided password with stored hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Generate JWT token
    const token = await user.generateJWTToken();

    // Hide password in the response
    user.password = undefined;

    // Set authentication token in HTTP-only cookie
    res.cookie("token", token, cookieOptions);

    // Send login success response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Log out user by clearing the cookie
 * @route   POST /api/v1/user/logout
 * @access  Public
 */
const logout = (req, res) => {
  // Clear authentication token by setting cookie to null
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  // Send logout success response
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export { register, login, logout };
