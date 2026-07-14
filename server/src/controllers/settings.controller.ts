import { Request, Response } from "express";
import User from "../models/Users.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const updateNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const { emailNotifications } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user!.id,
      { emailNotifications },
      { new: true },
    ).select("-password");

    res.json({
      success: true,
      user,
      message: "Notification settings updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update notification settings",
    });
  }
};
