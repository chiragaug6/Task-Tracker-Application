import { Router } from "express";
import { login, logout, register } from "../controllers/userController.js";
import { loginRateLimiter } from "../middlewares/rateLimiter.js";

const route = Router();

route.post("/register", register);
route.post("/login", loginRateLimiter, login);
route.get("/logout", logout);

export default route;
