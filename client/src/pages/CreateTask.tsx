import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, updateTask } from "../services/task.service";
import toast from "react-hot-toast";

function CreateTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "Personal",
    dueDate: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: "",
      description: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);

    if (newErrors.title || newErrors.description) return;

    try {
      if (id) {
        await updateTask(id, formData);
        toast.success("Task updated successfully!");
      } else {
        await createTask(formData);
        toast.success("Task created successfully!");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Unable to create task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-xl bg-white dark:bg-gray-800 shadow-lg p-5 sm:p-8 transition-colors duration-300"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          {id ? "Edit Task" : "Create Task"}
        </h1>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1 mb-3">{errors.title}</p>
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.description && (
          <p className="text-red-500 text-sm mt-1 mb-3">{errors.description}</p>
        )}

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-900 dark:text-white">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-3"
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Coding">Coding</option>
            <option value="Finance">Finance</option>
            <option value="Health">Health</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <input
          type="datetime-local"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white [color-scheme:light] dark:[color-scheme:dark] rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          {id ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
