import api from "./api.js";

export const getTasksRequest = async (projectId) => {
  const params = projectId ? { projectId } : {};
  const { data } = await api.get("/tasks", { params });
  return data;
};

export const createTaskRequest = async (payload) => {
  const { data } = await api.post("/tasks", payload);
  return data;
};

export const updateTaskRequest = async (id, payload) => {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data;
};

export const updateTaskStatusRequest = async (id, status) => {
  const { data } = await api.patch(`/tasks/${id}/status`, { status });
  return data;
};

export const deleteTaskRequest = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};
