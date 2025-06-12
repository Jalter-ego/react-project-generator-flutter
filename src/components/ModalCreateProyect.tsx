import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "./ui/button";
import { useUserContext } from "@/hooks/userContext";
import { toast } from "sonner";
import { fetchCreateProyect, type CreateProject } from "@/services/figma.service";
import { useNavigate } from "react-router-dom";

export function ModalCreateProyect({
    setOpenModal
}: { setOpenModal: Dispatch<SetStateAction<boolean>> }) {
    const { user } = useUserContext()
    const userId = user?.id
    const navigate = useNavigate()
    const [newProjectName, setNewProjectName] = useState('');

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
    return (
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
    )
}