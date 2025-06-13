import { useState } from 'react';
import { toast } from 'sonner';

interface ShareLinkModalProps {
  projectId: string;
  editKey: string;
  onClose: () => void;
}

export const ShareLinkModal = ({ projectId, editKey, onClose }: ShareLinkModalProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const url = `${window.location.origin}/projects/${projectId}?editKey=${editKey}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setIsCopied(true);
        toast.success('Enlace copiado al portapapeles');
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => toast.error('Error al copiar el enlace'));
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      {/* bg-black/30 = fondo negro al 30% de opacidad */}
      {/* backdrop-blur-sm = ligero efecto de desenfoque del fondo */}
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Compartir proyecto</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-300 mb-4">Comparte este enlace con otros para colaborar:</p>

        <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 bg-transparent p-3 text-gray-300 text-sm truncate focus:outline-none"
          />
          <button
            onClick={copyToClipboard}
            className={`px-4 py-3 ${isCopied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium transition-colors`}
          >
            {isCopied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <p>Cualquier persona con este enlace podrá editar el proyecto.</p>
        </div>
      </div>
    </div>
  );
};