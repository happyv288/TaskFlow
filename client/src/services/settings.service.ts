import api from "../api/axios";

export const updateNotifications = async (emailNotifications: boolean) => {
  const { data } = await api.put("/settings/notifications", {
    emailNotifications,
  });

  return data;
};

export const deleteAccount = async () => {
  const { data } = await api.delete("/settings/account");
  return data;
};
