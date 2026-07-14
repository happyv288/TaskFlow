import api from "../api/axios";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getProfile = async () => {
  const response = await api.get("/auth/profile", getAuthHeader());

  return response.data;
};

export const updateProfile = async (profileData: {
  name: string;
  email: string;
}) => {
  const response = await api.put("/auth/profile", profileData, getAuthHeader());

  return response.data;
};
export const uploadAvatar = async (file: File) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.put("/auth/avatar", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
