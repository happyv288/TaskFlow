import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, updateTask } from "../services/task.service";

function CreateTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        await updateTask(id, formData);
        alert("Task updated successfully!");
      } else {
        await createTask(formData);
        alert("Task created successfully!");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Unable to create task");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold mb-6">Create Task</h1>

        <input
          className="border p-3 rounded w-full mb-4"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          className="border p-3 rounded w-full mb-4"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <select
          className="border p-3 rounded w-full mb-4"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          className="border p-3 rounded w-full mb-6"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded w-full"
          type="submit"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
