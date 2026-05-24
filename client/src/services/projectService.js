import api from "./api.js";

export const getProjectsRequest = async () => {
  const { data } = await api.get("/projects");
  return data;
};

export const getProjectRequest = async (id) => {
  const { data } = await api.get(`/projects/${id}`);
  return data;
};

export const createProjectRequest = async (payload) => {
  const { data } = await api.post("/projects", payload);
  return data;
};

export const updateProjectRequest = async (id, payload) => {
  const { data } = await api.put(`/projects/${id}`, payload);
  return data;
};

export const deleteProjectRequest = async (id) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};
