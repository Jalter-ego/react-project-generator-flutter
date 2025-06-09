import { api } from ".";

export interface CreateProject {
  name: string;
  userId: string;
  screens: any[];
}

export const fetchCreateProyect = async (newProject: CreateProject) => {
  const response = await fetch(`${api}/figma`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProject),
  });
  const data = await response.json();
  return data;
};

export const fetchProjectsByUser = async (id: string) => {
  const response = await fetch(`${api}/figma/user/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const fetchProjectById = async (id: string) => {
  const response = await fetch(`${api}/figma/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const fetchDeleteProject = async (id: string) => {
  const response = await fetch(`${api}/figma/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const fetchUpdateProyect = async (project: CreateProject,id:string) => {
  console.log(project);
  console.log(id);
  
  const response = await fetch(`${api}/figma/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  const data = await response.json();
  return data;
};
