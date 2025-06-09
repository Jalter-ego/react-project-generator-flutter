import { useRef, useState } from 'react';
import { IconImage, IconSend } from '../../assets/Icons';

type PromptInputProps = {
  onSend: (prompt: string, image?: File) => void;
  disabled?: boolean;
};

export default function PromptInput({ onSend, disabled = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((prompt.trim() || image) && !disabled) {
      onSend(prompt, image || undefined);
      setPrompt('');
      setImage(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log('[Upload] Imagen seleccionada:', file.name, file.type, file.size);
      setImage(file);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe lo que necesitas..."
        className="w-full p-3 pr-20 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      />

      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className={`p-1 rounded-full ${disabled ? 'text-gray-500' : 'text-gray-400 hover:text-gray-300'
            }`}
        >
          <IconImage />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
          disabled={disabled}
        />
      </div>

      <button
        type="submit"
        disabled={disabled || (!prompt.trim() && !image)}
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ${disabled || (!prompt.trim() && !image)
          ? 'text-gray-500'
          : 'text-blue-400 hover:text-blue-300'
          }`}
      >
        <IconSend />
      </button>

      {image && (
        <div className="absolute -top-12 left-0 bg-gray-700 p-1 rounded-md">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white truncate max-w-[120px]">
              {image.name}
            </span>
            <button
              type="button"
              onClick={() => setImage(null)}
              className="text-xs text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </form>
  );
}