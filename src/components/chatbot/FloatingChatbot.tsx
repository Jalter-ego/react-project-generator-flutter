// src/components/chatbot/FloatingChatbot.tsx
import { useEffect, useRef, useState } from 'react';
import { sendMessageToGemini } from '../../services/chatbot/ai.service';
import type { ScreenType } from '../../types/CanvasItem';
import MessageBubble from './MessageBubble';
import PromptInput from './PromtInput';
import {memo} from 'react';

interface Props {
    updateScreensFromJSON: (screens: ScreenType[]) => void;
}

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
};

export default memo(function FloatingChatbot({ updateScreensFromJSON }: Props) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hola! Soy tu asistente de diseño. ¡Dime qué necesitas crear!",
            sender: 'bot'
        }
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSendPrompt = async (prompt: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text: prompt,
            sender: 'user'
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        const botResponse = await sendMessageToGemini(prompt);
        let botMessageText = botResponse;
        try {
            let cleanedResponse = botResponse.trim();
            if (cleanedResponse.startsWith('```json') && cleanedResponse.endsWith('```')) {
                cleanedResponse = cleanedResponse.slice(7, -3).trim();
            }
            const parsed = JSON.parse(cleanedResponse);
            if (Array.isArray(parsed)) {
                updateScreensFromJSON(parsed);
                botMessageText = `Diseño actualizado correctamente.`;
            }
        } catch (err) {
            console.error('Error parsing JSON:', err);
        }

        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: botMessageText,
            sender: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            {/* Botón flotante */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-500 rounded-full shadow-lg text-white text-2xl flex items-center justify-center hover:bg-blue-600"
                title="Abrir Asistente"
            >
                💬
            </button>

            {/* Chat flotante */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-gray-800 rounded-xl shadow-lg flex flex-col z-50 overflow-hidden border border-gray-600">
                    <header className="p-3 border-b border-gray-700 text-white font-semibold">
                        Asistente de Diseño
                    </header>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {messages.map(msg => (
                            <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} isMarkdown={msg.sender === 'bot'} />
                        ))}
                        {isLoading && (
                            <MessageBubble text="Pensando..." sender="bot" isLoading />
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-3 border-t border-gray-700">
                        <PromptInput onSend={handleSendPrompt} disabled={isLoading} />
                    </div>
                </div>
            )}
        </>
    );
});
