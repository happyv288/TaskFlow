import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  order: number;
  category:
    | "Personal"
    | "Work"
    | "Study"
    | "Coding"
    | "Finance"
    | "Health"
    | "Others";
  dueDate?: Date;
  user: mongoose.Types.ObjectId;
  reminderSent?: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    category: {
      type: String,
      enum: [
        "Personal",
        "Work",
        "Study",
        "Coding",
        "Finance",
        "Health",
        "Others",
      ],
      default: "Personal",
    },

    dueDate: {
      type: Date,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
