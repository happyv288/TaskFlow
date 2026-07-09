import { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import { getTasks } from "../services/task.service";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

function Dashboard() {
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
        <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="border rounded-lg p-4 mb-4 shadow">
              <h2 className="text-xl font-semibold">{task.title}</h2>

              <p>{task.description}</p>

              <p className="mt-2">
                Priority: <strong>{task.priority}</strong>
              </p>

              <p>
                Status: <strong>{task.status}</strong>
              </p>
            </div>
          ))
        )}
      </main>
    </>
  );
}

export default Dashboard;
