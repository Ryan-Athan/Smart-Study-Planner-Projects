import api from "./index";

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const getProfile = (token) =>
  api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
