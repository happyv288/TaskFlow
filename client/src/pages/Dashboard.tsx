import { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import { getTasks } from "../services/task.service";
import { Link } from "react-router-dom";
import { deleteTask } from "../services/task.service";
import TaskCard from "../components/TaskCard";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

function Dashboard() {
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete task.");
    }
  };
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data.tasks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Manage all your tasks in one place.</p>
          </div>

          <Link
            to="/create-task"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            + New Task
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Total</p>
            <h2 className="text-3xl font-bold">{tasks.length}</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Todo</p>
            <h2 className="text-3xl font-bold">
              {tasks.filter((task) => task.status === "todo").length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Progress</p>
            <h2 className="text-3xl font-bold">
              {tasks.filter((task) => task.status === "in-progress").length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Done</p>
            <h2 className="text-3xl font-bold">
              {tasks.filter((task) => task.status === "done").length}
            </h2>
          </div>
        </div>

        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDelete} />
          ))
        )}
      </main>
    </>
  );
}

export default Dashboard;
