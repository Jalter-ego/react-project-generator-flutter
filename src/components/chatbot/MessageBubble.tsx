import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { IconRobot, IconUser } from '../../assets/Icons';

type MessageBubbleProps = {
    text: string;
    sender: 'user' | 'bot';
    isLoading?: boolean;
    isMarkdown?: boolean;
    imageUrl?: string;
};

const MessageBubble = memo(({ text, sender, isLoading = false, isMarkdown = false, imageUrl }: MessageBubbleProps) => {
    return (
        <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-2 max-w-[80%]`}>
                {sender === 'bot' && (
                    <div className="mt-1 p-1 rounded-full bg-blue-500 text-white">
                        <IconRobot />
                    </div>
                )}

                <div className={`p-3 rounded-lg
                ${sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-700 text-white rounded-bl-none'}
                ${isLoading ? 'opacity-70' : ''}
                `}>
                    {imageUrl && (
                        <div className="mb-2">
                            <img
                                src={imageUrl}
                                alt="Uploaded content"
                                className="max-w-full max-h-40 rounded-md"
                            />
                        </div>
                    )}
                    {isLoading ? (
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                        </div>
                    ) : isMarkdown ? (
                        <ReactMarkdown
                            components={{ p: ({ children }) => <p className="text-sm">{children}</p> }}
                        >
                            {text}
                        </ReactMarkdown>) : (
                        <p className="text-sm">{text}</p>
                    )}
                </div>

                {sender === 'user' && (
                    <div className="mt-1 p-1 rounded-full bg-gray-600 text-white">
                        <IconUser />
                    </div>
                )}
            </div>
        </div>
    );
});
export default MessageBubble;