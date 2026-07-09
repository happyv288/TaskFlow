import { useNavigate } from "react-router-dom";
type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate?: string;
};

type TaskCardProps = {
  task: Task;
  onDelete: (id: string) => void;
};

function TaskCard({ task, onDelete }: TaskCardProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{task.title}</h2>

          <p className="text-gray-600 mt-2">{task.description}</p>

          <div className="flex gap-4 mt-4 text-sm">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
              {task.priority}
            </span>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {task.status}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit-task/${task._id}`)}
            className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="bg-red-600 text-white px-3 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
