import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  uploadAvatar,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteAccount,
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

// Test Route
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth route is working!",
  });
});

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Password Reset
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Upload Avatar
router.put("/avatar", protect, upload.single("avatar"), uploadAvatar);

// Change Password
router.put("/change-password", protect, changePassword);

// Delete Account
router.delete("/delete-account", protect, deleteAccount);

export default router;
