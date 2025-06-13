import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ModalJoinProjectProps {
  onClose: () => void;
}

export const ModalJoinProject = ({ onClose }: ModalJoinProjectProps) => {
  const [inviteLink, setInviteLink] = useState('');
  const navigate = useNavigate();

  const handleJoinProject = () => {
    try {
      // Extraer el ID del proyecto y editKey de la URL
      const url = new URL(inviteLink);
      const pathParts = url.pathname.split('/');
      const projectId = pathParts[pathParts.length - 1];
      const editKey = url.searchParams.get('editKey');

      if (!projectId || !editKey) {
        throw new Error('Enlace inválido');
      }

      navigate(`/projects/${projectId}?editKey=${editKey}`);
      toast.success('Uniéndose al proyecto...');
      onClose();
    } catch (error) {
      toast.error('Enlace de invitación inválido. Por favor verifica el enlace.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Unirse a Proyecto</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-300 mb-4">Ingresa el enlace de invitación para unirte al proyecto:</p>

        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Pega el enlace de invitación aquí"
            value={inviteLink}
            onChange={(e) => setInviteLink(e.target.value)}
            className="bg-gray-700 text-white border-gray-600"
          />

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleJoinProject}
              disabled={!inviteLink.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              Unirse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};