import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import settingsRoutes from "./routes/settings.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 TaskFlow API is running!",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/settings", settingsRoutes);

export default app;
