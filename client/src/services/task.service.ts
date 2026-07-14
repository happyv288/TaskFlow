import api from "../api/axios";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTasks = async () => {
  const response = await api.get("/tasks", getAuthHeader());
  return response.data;
};

export const createTask = async (taskData: {
  title: string;
  description: string;
  priority: string;
  category: string;
  dueDate: string;
}) => {
  const response = await api.post("/tasks", taskData, getAuthHeader());

  return response.data;
};

export const deleteTask = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateTask = async (
  id: string,
  taskData: {
    title: string;
    description: string;
    priority: string;
    category: string;
    dueDate: string;
    status?: string;
  },
) => {
  const response = await api.put(`/tasks/${id}`, taskData, getAuthHeader());

  return response.data;
};
export const reorderTasks = async (
  tasks: {
    id: string;
    order: number;
  }[],
) => {
  const response = await api.put("/tasks/reorder", { tasks }, getAuthHeader());

  return response.data;
};
