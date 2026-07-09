import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Test Route
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth route is working!",
  });
});

// Register Route
router.post("/register", register);

router.post("/login", login);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome! This is a protected route.",
  });
});

export default router;
