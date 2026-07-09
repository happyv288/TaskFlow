import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;