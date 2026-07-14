import cron from "node-cron";
import Task from "../models/Task.js";
import { sendEmail } from "../utils/sendEmail.js";
import { reminderTemplate } from "../utils/reminderTemplate.js";

export const startReminderService = () => {
  cron.schedule("* * * * *", async () => {
    console.log("⏰ Checking for due tasks...");

    const now = new Date();

    const nextHour = new Date();
    nextHour.setHours(nextHour.getHours() + 1);

    try {
      console.log("Current time:", now);
      console.log("Next hour:", nextHour);

      const tasks = await Task.find({
        dueDate: {
          $gte: now,
          $lte: nextHour,
        },
        reminderSent: false,
        status: { $ne: "done" },
      }).populate("user");

      console.log("Tasks found:", tasks.length);

      tasks.forEach((task) => {
        console.log({
          title: task.title,
          dueDate: task.dueDate,
          reminderSent: task.reminderSent,
          status: task.status,
        });
      });

      for (const task of tasks) {
        const user: any = task.user;

        if (!user.emailNotifications) {
          continue;
        }

        await sendEmail({
          to: user.email,
          subject: `⏰ Reminder: ${task.title} is due soon`,
          html: reminderTemplate(
            user.name,
            task.title,
            task.priority,
            task.category,
            task.dueDate!,
          ),
        });

        task.reminderSent = true;
        await task.save();

        console.log(`✅ Reminder sent for "${task.title}"`);
      }
    } catch (error) {
      console.error("Reminder Error:", error);
    }
  });
};
