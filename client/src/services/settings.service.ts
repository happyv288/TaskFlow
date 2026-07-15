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

export const updateNotifications = async (emailNotifications: boolean) => {
  const { data } = await api.put(
    "/settings/notifications",
    { emailNotifications },
    getAuthHeader(),
  );

  return data;
};

export const deleteAccount = async () => {
  const { data } = await api.delete("/settings/account", getAuthHeader());

  return data;
};
