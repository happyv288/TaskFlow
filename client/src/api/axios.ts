import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "https://taskflow-api-lkrn.onrender.com/api",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      toast.error("Your session has expired. Please log in again.");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
    return Promise.reject(error);
  },
);

export default api;
