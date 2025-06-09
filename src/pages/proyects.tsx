import { IconTrash } from "@/assets/Icons";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/hooks/userContext";
import { fetchCreateProyect, fetchDeleteProject, fetchProjectsByUser, type CreateProject } from "@/services/figma.service";
import type { ScreenType } from "@/types/CanvasItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface Project {
    id: string;
    name: string;
    screens: ScreenType[];
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [newProjectName, setNewProjectName] = useState('');
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()
    const { user } = useUserContext()
    const userId = user?.id

    useEffect(() => {
        fetchProjects();
    }, []);


    const fetchProjects = async () => {
        if (!userId) {
            toast('User ID is undefined');
            return;
        }
        try {
            const data = await fetchProjectsByUser(userId)
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    const createProject = async () => {
        if (!newProjectName.trim()) {
            alert('Please enter a project name');
            return;
        }
        if (!userId) {
            toast('User ID is undefined');
            return;
        }
        try {
            const newProject: CreateProject = {
                name: newProjectName,
                userId: userId,
                screens: []
            }
            console.log(newProject);

            const response = await fetchCreateProyect(newProject)
            navigate(`/projects/${response.id}`)
        } catch (error) {
            console.error('Failed to create project:', error);
            alert('Failed to create project');
        }
    };

    const deleteProject = async (id: string) => {
        try {
            await fetchDeleteProject(id)
            fetchProjects()
            toast('proyecto eliminado correctamente')
        } catch (error) {
            console.log(error);
        }
    }

    const handleClikProject = (id: string) => {
        navigate(`/projects/${id}`)
    }

    return (
        <div className="w-full min-h-dvh lg:px-44 lg:py-20 md:px-24 sm:px-14 py-10">
            <section className="flex flex-col pb-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary 
                        to-primary/60 bg-clip-text text-transparent pb-8">
                    Tus Proyectos
                </h1>
                <Button className="w-[180px] cursor-pointer"
                    onClick={() => setOpenModal(true)}>
                    Crear Proyecto nuevo
                </Button>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
                ">
                {
                    projects.map((proyect, index) => (
                        <article key={index}
                            onClick={() => handleClikProject(proyect.id)}
                            className="px-5 py-4 gap-4 flex items-center 
                                  bg-secondary backdrop-blur-sm rounded-xl
                                    border hover:border-primary/50
                                    transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1
                                 justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                {proyect.name}
                            </h2>
                            <div className="hover:text-red-400"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteProject(proyect.id)
                                }
                                }>

                                <IconTrash />
                            </div>
                        </article>
                    ))
                }
            </div>
            {openModal &&
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Crear nuevo proyecto</h2>
                        <input
                            type="text"
                            placeholder="Nombre del proyecto"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary mb-4"
                        />
                        <div className="flex justify-end gap-3">
                            <Button
                                onClick={() => setOpenModal(false)}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={createProject}
                                className="px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg transition"
                            >
                                Crear
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}