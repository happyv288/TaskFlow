import { Response } from "express";
import Task from "../models/Task.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, category, dueDate, status } =
      req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      category,
      dueDate,
      status,
      user: req.user!.id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user!.id }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      _id: id,
      user: req.user!.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndUpdate(
      {
        _id: id,
        user: req.user!.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user!.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const reorderTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { tasks } = req.body;

    for (const task of tasks) {
      await Task.findByIdAndUpdate(task.id, {
        order: task.order,
      });
    }

    res.json({
      success: true,
      message: "Tasks reordered",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
