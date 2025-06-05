import { useState } from 'react';
import MessageBubble from './MessageBubble';
import PromptInput from './PromtInput';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

export default function ChatbotSidebar() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente de diseño. ¿Qué necesitas crear hoy?',
      sender: 'bot'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPrompt = async (prompt: string) => {
    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: prompt,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Aquí luego integraremos la llamada a la IA
    // Por ahora simulamos una respuesta
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Voy a generar los componentes que necesitas. Pronto podrás previsualizarlos aquí antes de aplicarlos.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <aside className="w-80 h-full flex flex-col bg-gray-800 border-l border-gray-700">
      <header className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Asistente de Diseño</h2>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <MessageBubble 
            key={message.id} 
            text={message.text} 
            sender={message.sender} 
          />
        ))}
        {isLoading && (
          <MessageBubble 
            text="Pensando..." 
            sender="bot" 
            isLoading 
          />
        )}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <PromptInput 
          onSend={handleSendPrompt} 
          disabled={isLoading}
        />
      </div>
    </aside>
  );
}