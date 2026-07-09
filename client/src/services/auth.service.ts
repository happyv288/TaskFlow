import api from "../api/axios";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

export const registerUser = async (userData: RegisterData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (loginData: LoginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};
