import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { updateNotifications } from "../controllers/settings.controller.js";

const router = express.Router();

router.put("/notifications", protect, updateNotifications);

export default router;
