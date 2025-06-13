import { useRef, useState } from 'react';
import { IconImage, IconSend } from '../../assets/Icons';
import { useSpeechRecognition } from './useSpeechRecognition';

type PromptInputProps = {
  onSend: (prompt: string, image?: File) => void;
  disabled?: boolean;
};

export default function PromptInput({ onSend, disabled = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isRecording, startRecognition, stopRecognition } = useSpeechRecognition(
    (text) => setPrompt(text),
    (error) => {
      if (error === 'no-speech') alert('No se detectó voz. Intenta de nuevo.');
      if (error === 'not-allowed') alert('Permiso de micrófono denegado.');
    }
  );

  const handleToggleRecording = () => {
    isRecording ? stopRecognition() : startRecognition();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((prompt.trim() || image) && !disabled) {
      onSend(prompt, image || undefined);
      setPrompt('');
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe lo que necesitas..."
        className="w-full p-3 pr-28 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      />

      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex gap-2">
        <button
          type="button"
          onClick={handleToggleRecording}
          disabled={disabled}
          className={`p-1 rounded-full ${disabled ? 'text-gray-500' : isRecording ? 'text-red-400' : 'text-gray-400 hover:text-gray-300'
            }`}
          title={isRecording ? 'Detener grabación' : 'Grabar voz'}
        >
          {isRecording ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.47 6 6.93V21h2v-3.07c3.39-.46 6-3.4 6-6.93h-2z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className={`p-1 rounded-full ${disabled ? 'text-gray-500' : 'text-gray-400 hover:text-gray-300'}`}
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
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ${disabled || (!prompt.trim() && !image) ? 'text-gray-500' : 'text-blue-400 hover:text-blue-300'
          }`}
      >
        <IconSend />
      </button>

      {image && (
        <div className="absolute -top-12 left-0 bg-gray-700 p-1 rounded-md">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white truncate max-w-[120px]">{image.name}</span>
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
