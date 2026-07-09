import api from "../api/axios";

export const getTasks = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};