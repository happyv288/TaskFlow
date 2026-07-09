import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 TaskFlow API is running!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;

// dLpMsI8OhKIMrdi5
// victorhappiness18_db_user
// mongodb+srv://victorhappiness18_db_user:dLpMsI8OhKIMrdi5@cluster0.ynq04sh.mongodb.net/?appName=Cluster0

// na2cCkGOX2SP8EqD
