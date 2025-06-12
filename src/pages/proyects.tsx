import { IconTrash } from "@/assets/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/hooks/userContext";
import {
    fetchDeleteProject,
    fetchProjectsByUser,
} from "@/services/figma.service";
import type { ScreenType } from "@/types/CanvasItem";
import { useEffect, useState, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModalCreateProyect } from "@/components/ModalCreateProyect";

export interface Project {
    id: string;
    name: string;
    screens: ScreenType[];
    createdAt: string;
    updatedAt: string;
    description?: string;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("name-asc");
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const navigate = useNavigate();
    const { user } = useUserContext();
    const userId = user?.id;

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        let result = [...projects];
        if (searchQuery) {
            result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (sortOption === "name-asc") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "name-desc") {
            result.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortOption === "updated-desc") {
            result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        }
        setFilteredProjects(result);
    }, [searchQuery, sortOption, projects]);

    const fetchProjects = async () => {
        if (!userId) {
            toast.error("User ID is undefined");
            return;
        }
        try {
            const data = await fetchProjectsByUser(userId);
            setProjects(data);
            setFilteredProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            toast.error("Failed to fetch projects");
        }
    };

    const deleteProject = async (id: string) => {
        try {
            await fetchDeleteProject(id);
            fetchProjects();
            setSelectedProjects(selectedProjects.filter((pid) => pid !== id));
            toast.success("Project deleted successfully");
        } catch (error) {
            console.error("Failed to delete project:", error);
            toast.error("Failed to delete project");
        }
    };

    const deleteSelectedProjects = async () => {
        if (selectedProjects.length === 0) {
            toast.info("No projects selected");
            return;
        }
        try {
            await Promise.all(selectedProjects.map((id) => fetchDeleteProject(id)));
            fetchProjects();
            setSelectedProjects([]);
            toast.success(`${selectedProjects.length} project(s) deleted successfully`);
        } catch (error) {
            console.error("Failed to delete projects:", error);
            toast.error("Failed to delete projects");
        }
    };

    const toggleProjectSelection = (id: string) => {
        setSelectedProjects((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const handleClickProject = (id: string) => {
        navigate(`/projects/${id}`);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Tus Proyectos
                </h1>
                <p className="text-gray-600 mt-2">Gestiona y crea tus diseños de aplicaciones móviles.</p>
            </header>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
                    className="max-w-xs"
                />
                <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name-asc">Nombre (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Nombre (Z-A)</SelectItem>
                        <SelectItem value="updated-desc">Ultima Modificacion</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={() => setOpenModal(true)} className="bg-primary text-white hover:bg-primary/90">
                    Crear Nuevo Proyecto
                </Button>
                {selectedProjects.length > 0 && (
                    <Button
                        onClick={deleteSelectedProjects}
                        variant="destructive"
                        className="bg-red-500 text-white hover:bg-red-600"
                    >
                        Eliminar Selecciones ({selectedProjects.length})
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.length === 0 ? (
                    <p className="text-gray-500 col-span-full">
                        No se encontraron proyectos. ¡Crea uno para empezar!</p>
                ) : (
                    filteredProjects.map((project) => (
                        <Card
                            key={project.id}
                            className="hover:shadow-xl transition-all cursor-pointer"
                            onClick={() => handleClickProject(project.id)}
                        >
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedProjects.includes(project.id)}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={() => toggleProjectSelection(project.id)}
                                        className="h-4 w-4"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteProject(project.id);
                                        }}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <IconTrash />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full h-40 bg-gray-200 rounded mb-4">
                                        <img
                                            src={"https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/1be2cbac5be7a9741a4c1cd880e1b12876f015f1/31fff91fe048d92f78564fa324b3098ee844efed"}
                                            alt={`${project.name} thumbnail`}
                                            className="w-full h-full object-cover rounded"
                                        />
                                </div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Creacion: {new Date(project.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500 mb-1">
                                    Ultima Modificacion: {new Date(project.updatedAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">Screens: {project.screens.length}</p>
                                {project.description && (
                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {openModal &&
                <ModalCreateProyect
                    setOpenModal={setOpenModal}
                />
            }
        </div>
    );
}