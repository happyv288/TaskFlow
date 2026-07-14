import { Router } from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  reorderTasks,
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);

// Put this BEFORE /:id
router.put("/reorder", protect, reorderTasks);

router.get("/:id", protect, getTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
