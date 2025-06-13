import { api } from ".";

export interface CreateProject {
  name: string;
  userId: string;
  editKey?: string;
  screens: any[];
}

export interface UpdateProject {
  name: string;
  userId: string;
  editKey: string
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

export const fetchUpdateProyect = async (
  project: UpdateProject,
  id: string
) => {
  const sanitized = sanitizeProject(project);
  console.log(sanitized);

  const response = await fetch(`${api}/figma/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sanitized),
  });

  const data = await response.json();
  console.log(data);

  return data;
};

function sanitizeProject(project: UpdateProject) {
  return {
    name: project.name,
    userId: project.userId,
    editKey: project.editKey,
    screens: project.screens.map((screen) => ({
      id: screen.id,
      name: screen.name,
      components: screen.components.map((component: any) => ({
        id: component.id,
        type: component.type,
        x: component.x,
        y: component.y,
        properties: component.properties,
      })),
    })),
  };
}


export const fetchGenerateProyect = async (json: any) => {
  const response = await fetch(`${api}/flutter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json),
  });

  if (!response.ok) throw new Error("Error en la generación");

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'flutter_project.zip';
  a.click();
  window.URL.revokeObjectURL(url);
};