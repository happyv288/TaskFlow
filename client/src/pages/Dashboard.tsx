import { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";

import { Link } from "react-router-dom";
import {
  getTasks,
  deleteTask,
  updateTask,
  reorderTasks,
} from "../services/task.service";
import TaskCard from "../components/TaskCard";
import Swal from "sweetalert2";
import TaskChart from "../components/TaskChart";
import KanbanBoard from "../components/KanbanBoard";
import { FaFlag } from "react-icons/fa";

import { MdCategory } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  category: string;
  dueDate?: string;
};

function Dashboard() {
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Task?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteTask(id);

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Task deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to delete task.",
      });
    }
  };
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const task = tasks.find((task) => task._id === id);

      if (!task) return;

      await updateTask(id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        dueDate: task.dueDate || "",
        status,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? { ...task, status } : task)),
      );
    } catch (error) {
      console.error(error);
    }
  };
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "board">("list");
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const data = await getTasks();
        setTasks(data.tasks);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "done").length;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "all" || task.category === categoryFilter;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesCategory
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.dueDate || "").getTime() -
            new Date(a.dueDate || "").getTime()
          );

        case "oldest":
          return (
            new Date(a.dueDate || "").getTime() -
            new Date(b.dueDate || "").getTime()
          );

        case "priority": {
          const order = {
            high: 3,
            medium: 2,
            low: 1,
          };

          return (
            order[b.priority as keyof typeof order] -
            order[a.priority as keyof typeof order]
          );
        }

        case "az":
          return a.title.localeCompare(b.title);

        default:
          return 0;
      }
    });
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);

    const [movedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, movedItem);

    // Update UI immediately
    setTasks(items);

    try {
      await reorderTasks(
        items.map((task, index) => ({
          id: task._id,
          order: index,
        })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="w-full mx-auto px-4 sm:px-6 lg:px-4 py-4 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Dashboard Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Manage all your tasks in one place.
          </p>
        </div>
        <div className="mt-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold tracking-wide">
            Welcome back, {user?.name}! 👋
          </h2>

          <p className="mt-2 text-blue-100">
            Let's make today productive 🚀{" "}
            <span className="font-bold">{tasks.length}</span> task
            {tasks.length !== 1 ? "s" : ""}.
          </p>

          <div className="mt-4 flex flex-wrap gap-6">
            <div>
              <p className="text-blue-100 text-sm">Todo</p>
              <p className="text-2xl font-bold">
                {tasks.filter((task) => task.status === "todo").length}
              </p>
            </div>

            <div>
              <p className="text-blue-100 text-sm">In Progress</p>
              <p className="text-2xl font-bold">
                {tasks.filter((task) => task.status === "in-progress").length}
              </p>
            </div>

            <div>
              <p className="text-blue-100 text-sm">Done</p>
              <p className="text-2xl font-bold">
                {tasks.filter((task) => task.status === "done").length}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Productivity
            </h2>

            <span className="text-2xl font-bold text-green-600">
              {completionRate}%
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-600 h-4 transition-all duration-700"
              style={{
                width: `${completionRate}%`,
              }}
            />
          </div>

          <p className="text-gray-500 dark:text-gray-400">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 transition-colors  flex justify-between items-center">
            <div>
              <p className="text-gray-500 dark:text-gray-400">High Priority</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {tasks.filter((task) => task.priority === "high").length}
              </h2>
            </div>

            <FaFlag className="text-red-500 text-3xl" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 transition-colors flex justify-between items-center">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Personal Tasks</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {tasks.filter((task) => task.category === "Personal").length}
              </h2>
            </div>

            <MdCategory className="text-purple-600 text-3xl" />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 transition-colors flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 dark:text-gray-400">Work Tasks</h3>

              <p className="text-4xl font-bold mt-2 text-gray-900 dark:text-white">
                {tasks.filter((task) => task.category === "Work").length}
              </p>
            </div>

            <MdCategory className="text-indigo-600 text-4xl" />
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-1 flex">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-lg transition ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              📋 List
            </button>

            <button
              onClick={() => setView("board")}
              className={`px-4 py-2 rounded-lg transition ${
                view === "board"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              📌 Board
            </button>
          </div>
        </div>

        {/* Search & New Task */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-3 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Link
            to="/create-task"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-center transition"
          >
            + New Task
          </Link>
        </div>
        <div className="flex justify-end mb-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
            <option value="az">Title (A-Z)</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 transition-colors">
            <p className="text-gray-500 dark:text-gray-400">Total</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {tasks.length}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 transition-colors">
            <p className="text-gray-500 dark:text-gray-400">Todo</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {tasks.filter((task) => task.status === "todo").length}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 transition-colors">
            <p className="text-gray-500 dark:text-gray-400">Progress</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {tasks.filter((task) => task.status === "in-progress").length}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 transition-colors">
            <p className="text-gray-500 dark:text-gray-400">Done</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {tasks.filter((task) => task.status === "done").length}
            </h2>
          </div>
        </div>
        <div className="mb-8">
          <TaskChart
            todo={tasks.filter((task) => task.status === "todo").length}
            progress={
              tasks.filter((task) => task.status === "in-progress").length
            }
            done={tasks.filter((task) => task.status === "done").length}
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {["all", "todo", "in-progress", "done"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 sm:px-4 py-2 rounded-lg transition whitespace-nowrap flex-shrink-0 ${
                statusFilter === status
                  ? "bg-blue-600 text-white"
                  : ":bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {status === "all"
                ? "All"
                : status === "in-progress"
                  ? "In Progress"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              "all",
              "Personal",
              "Work",
              "Study",
              "Coding",
              "Finance",
              "Health",
              "Others",
            ].map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg transition ${
                  categoryFilter === category
                    ? "bg-purple-600 text-white"
                    : ":bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-8">
          {["all", "high", "medium", "low"].map((priority) => (
            <button
              key={priority}
              onClick={() => setPriorityFilter(priority)}
              className={`px-4 py-2 rounded-lg transition ${
                priorityFilter === priority
                  ? "bg-red-600 text-white"
                  : ":bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow transition-colors">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Loading your tasks...
            </p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center transition-colors">
            <div className="text-6xl mb-4">📋</div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {" "}
              You're all caught up!
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Create your first task to start organizing your work.
            </p>

            <Link
              to="/create-task"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              + Create Your First Task
            </Link>
          </div>
        ) : view === "list" ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-4"
                >
                  {filteredTasks.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onDelete={handleDelete}
                            onStatusChange={handleStatusChange}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <KanbanBoard
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>
    </>
  );
}

export default Dashboard;
