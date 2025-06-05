import { useEffect, useRef, useState } from 'react';
import { sendMessageToGemini } from '../../services/chatbot/ai.service';
import type { ScreenType } from '../../types/CanvasItem';
import MessageBubble from './MessageBubble';
import PromptInput from './PromtInput';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
};
interface ChatbotSidebarProps { updateScreensFromJSON: (screens: ScreenType[]) => void; }

export default function ChatbotSidebar({ updateScreensFromJSON }: ChatbotSidebarProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hola!!!! soy tu asistente para hacer disenos super rapido, que quieres que disene por ti?",
            sender: 'bot'
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const validateScreens = (json: any): json is ScreenType[] => {
        return Array.isArray(json) && json.every(screen =>
            screen &&
            typeof screen === 'object' &&
            'id' in screen &&
            typeof screen.id === 'string' &&
            'name' in screen &&
            typeof screen.name === 'string' &&
            'components' in screen &&
            Array.isArray(screen.components) &&
            screen.components.every((comp: any) =>
                comp &&
                typeof comp === 'object' &&
                'id' in comp &&
                typeof comp.id === 'string' &&
                'type' in comp &&
                ['button', 'textfield', 'checkbox', 'appbar1', 'iconUser', 'iconSearch', 'iconLock', 'iconMenuDeep'].includes(comp.type) &&
                'x' in comp &&
                typeof comp.x === 'number' &&
                'y' in comp &&
                typeof comp.y === 'number' &&
                'properties' in comp &&
                typeof comp.properties === 'object'
            )
        );
    };

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
            // Limpiar backticks y espacios en blanco
            let cleanedResponse = botResponse.trim();
            if (cleanedResponse.startsWith('```json') && cleanedResponse.endsWith('```')) {
                cleanedResponse = cleanedResponse.slice(7, -3).trim();
            }
            const parsed = JSON.parse(cleanedResponse);
            if (validateScreens(parsed)) {
                updateScreensFromJSON(parsed);
                botMessageText = `Diseño actualizado correctamente 👌😎`;
            }
        } catch (e) {
            console.error("Error al parsear JSON:", e, "Respuesta original:", botResponse);
        }

        // Añadir la respuesta del bot
        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: botMessageText,
            sender: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);

        setIsLoading(false);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
                        isMarkdown={message.sender === 'bot'}
                    />
                ))}
                {isLoading && (
                    <MessageBubble
                        text="Pensando..."
                        sender="bot"
                        isLoading
                    />
                )}
                <div ref={messagesEndRef} />
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