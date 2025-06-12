import { useUserContext } from "@/hooks/userContext";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProjectsByUser } from "@/services/figma.service";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Project } from "./proyects";
import { ModalCreateProyect } from "@/components/ModalCreateProyect";
import LoginModal from "@/components/auth/login";

export default function Dashboard() {
    const { user, logout, perfil } = useUserContext();
    const [projects, setProjects] = useState<Project[]>([]);
    const [openModal, setOpenModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        if (user?.id) {
            fetchRecentProjects();
        }
        console.log('cambia el valor');
        
    }, [user]);

    const fetchRecentProjects = async () => {
        try {
            const data = await fetchProjectsByUser(user!.id);
            const recent = data
                .sort((a: Project, b: Project) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .slice(0, 3);
            setProjects(recent);
        } catch (error) {
            console.error("Failed to fetch recent projects:", error);
            toast.error("Failed to load recent projects");
        }
    };

    return (
        <div className="w-full min-h-dvh bg-gray-50 grid grid-rows-[auto_1fr_auto]">
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
            <header className="border-b bg-white shadow-sm flex justify-between items-center p-4
                sm:px-10 px-20">
                <h1 className="text-2xl font-bold text-primary">DesignHub</h1>
                <div className="flex justify-end gap-4">
                    <section>
                        <SignedOut>
                            <div className="bg-primary px-4 py-1 rounded-2xl text-white">
                                <SignInButton mode="modal" />
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </section>

                    <section className="flex items-center gap-4 md:text-sm text-[10px]">
                        {!user && (
                            <button
                                onClick={() => setShowLoginModal(!openModal)}
                                className="bg-black rounded-4xl text-white font-semibold p-1.5 px-4 hover:opacity-90 transition-all duration-300"
                            >
                                Iniciar Sesión
                            </button>
                        )}
                        {user && (
                            <a
                                onClick={logout}
                                href={'/'}
                                className="bg-white border border-zinc-600 rounded-4xl text-black
                                    font-semibold py-1.5 px-4 md:p-1.5 md:px-4 hover:opacity-90 
                                    transition-all w-fit"
                            >
                                Cerrar Sesión
                            </a>
                        )}
                    </section>
                </div>
            </header>

            <main className="sm:px-10 md:px-20 lg:px-44 py-8">
                <section className="mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Bienvenido, {user?.name || "User"}!
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Crea y gestiona fácilmente el diseño de tus aplicaciones móviles. Empieza un nuevo proyecto o explora tu trabajo reciente a continuación.                    </p>
                </section>

                <section className="mb-8 flex gap-4">
                    <Button className="bg-primary text-white hover:bg-primary/90"
                        onClick={() => setOpenModal(true)}
                    >
                        Crear Nuevo Proyecto
                    </Button>
                    <Link to="/projects">
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                            ver todos los proyectos
                        </Button>
                    </Link>
                </section>

                <section className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4">Proyectos Recientes</h3>
                    {projects.length === 0 ? (
                        <p className="text-gray-500">No recent projects. Create one to get started!</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-tada">
                            {projects.map((project) => (
                                <Card
                                    key={project.id}
                                    className="hover:shadow-lg transition-shadow cursor-pointer"
                                    onClick={() => window.location.href = `/projects/${project.id}`}
                                >
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="w-full h-32 bg-gray-200 rounded mb-2">
                                                <img
                                                    src={'https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/1be2cbac5be7a9741a4c1cd880e1b12876f015f1/31fff91fe048d92f78564fa324b3098ee844efed'}
                                                    alt={`${project.name} thumbnail`}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Ultima Modificacion: {new Date(project.updatedAt).toLocaleDateString()}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>

                {user && (
                    <section>
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center gap-4">
                                <img
                                    src={perfil || "https://via.placeholder.com/40"}
                                    alt="User avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}

                {openModal &&
                    <ModalCreateProyect
                        setOpenModal={setOpenModal}
                    />
                }
            </main>

            <footer className="bg-gray-300 text-zinc-500 text-center p-4">
                <p>&copy; 2025 DesignHub. All rights reserved.</p>
            </footer>
        </div>
    );
}