import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaEdit, FaTrash, FaFlag } from "react-icons/fa";
import { MdCategory, MdDone } from "react-icons/md";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  category: string;
  dueDate?: string;
};

type TaskCardProps = {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
};

function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  const navigate = useNavigate();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task._id, e.target.value);
  };

  const priorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "done";

  const getDueStatus = () => {
    if (!task.dueDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (diff < 0)
      return {
        text: "Overdue",
        color: "bg-red-100 text-red-600",
      };

    if (diff === 0)
      return {
        text: "Due Today",
        color: "bg-orange-100 text-orange-600",
      };

    if (diff === 1)
      return {
        text: "Due Tomorrow",
        color: "bg-yellow-100 text-yellow-700",
      };

    return {
      text: `${diff} day${diff > 1 ? "s" : ""} left`,
      color: "bg-green-100 text-green-600",
    };
  };

  const dueStatus = getDueStatus();

  return (
    <div
      className={`${
        isOverdue ? "bg-red-50 dark:bg-red-950" : "bg-white dark:bg-gray-800"
      } rounded-xl shadow p-6 border-l-4 transition-colors ${
        isOverdue
          ? "border-red-600"
          : task.priority === "high"
            ? "border-red-500"
            : task.priority === "medium"
              ? "border-yellow-500"
              : "border-green-500"
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        {/* LEFT SIDE */}
        <div className="flex-1 min-w-0">
          <h2 className="text-left text-xl font-bold text-gray-900 dark:text-white break-words">
            {task.title}
          </h2>

          <p className="mt-2 text-left text-gray-600 dark:text-gray-300 break-words">
            {task.description}
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            aria-label="Edit task"
            onClick={() => navigate(`/edit-task/${task._id}`)}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 transition"
          >
            <FaEdit className="text-blue-600 dark:text-blue-300" />
          </button>

          <button
            type="button"
            aria-label="Delete task"
            onClick={() => onDelete(task._id)}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 transition"
          >
            <FaTrash className="text-red-600 dark:text-red-300" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {/* Priority */}
        <span
          className={`${priorityColor(
            task.priority,
          )} px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium`}
        >
          <FaFlag className="text-red-500" />
          {task.priority}
        </span>

        {/* Category */}
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium">
          <MdCategory className="text-purple-600" />
          {task.category}
        </span>

        {/* Status */}
        <div className="flex items-center gap-2">
          <MdDone className="text-green-600" />

          <select
            value={task.status}
            onChange={handleStatusChange}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-1 text-sm"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Due Date */}
        {dueStatus && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <FaCalendarAlt className="text-blue-600" />

            <span>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No due date"}
            </span>
          </div>
        )}

        {/* Due Status */}
        {dueStatus && (
          <span
            className={`${dueStatus.color} px-3 py-1 rounded-full text-xs font-semibold`}
          >
            {dueStatus.text}
          </span>
        )}

        {/* Overdue */}
        {isOverdue && (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
            ⏰ Overdue
          </span>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
