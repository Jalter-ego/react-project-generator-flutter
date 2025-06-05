import { IconSend } from '@tabler/icons-react';
import { useState } from 'react';

type PromptInputProps = {
  onSend: (prompt: string) => void;
  disabled?: boolean;
};

export default function PromptInput({ onSend, disabled = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !disabled) {
      onSend(prompt);
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe lo que necesitas..."
        className="w-full p-3 pr-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !prompt.trim()}
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full ${
          disabled || !prompt.trim() 
            ? 'text-gray-500' 
            : 'text-blue-400 hover:text-blue-300'
        }`}
      >
        <IconSend size={20} />
      </button>
    </form>
  );
}