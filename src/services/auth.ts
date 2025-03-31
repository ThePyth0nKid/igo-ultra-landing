// src/services/auth.ts
import API from "@/lib/axios";

export const signup = async (data: {
  username: string;
  email: string;
  password: string;
  password2: string;
}) => {
  const res = await API.post("/users/register/", data);
  return res.data;
};

export const login = async (data: {
  username: string;
  password: string;
}) => {
  const res = await API.post("/token/", data);
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
  return res.data;
};

export const getProfile = async () => {
  const res = await API.get("/users/me/");
  return res.data;
};
