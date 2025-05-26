import { Router } from "express";
import {
  getMe,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { loginRateLimiter } from "../middlewares/rateLimiter.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const route = Router();

route.post("/register", register);
route.post("/login", loginRateLimiter, login);
route.get("/logout", logout);
route.get("/me", isLoggedIn, getMe);

export default route;
