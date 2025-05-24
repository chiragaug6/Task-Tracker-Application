import AppError from "../utils/error.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  // Extract token from cookies
  const { token } = req.cookies;

  // If no token is found, the user is not authenticated
  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 401));
  }

  try {
    // Verify token using secret key and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make user ID available to subsequent middlewares and route handlers
    req.userId = decoded.userId;

    next();
  } catch (error) {
    // Handle expired or invalid token
    return next(
      new AppError("Please login again! Token is invalid or expired.", 401)
    );
  }
};
