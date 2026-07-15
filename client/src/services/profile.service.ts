import api from "../api/axios";

const getAuthHeader = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProfile = async () => {
  const { data } = await api.get("/auth/profile", getAuthHeader());

  return data;
};

export const updateProfile = async (profileData: {
  name: string;
  email: string;
}) => {
  const { data } = await api.put("/auth/profile", profileData, getAuthHeader());

  return data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const { data } = await api.put("/auth/avatar", formData, {
    headers: {
      ...getAuthHeader().headers,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
