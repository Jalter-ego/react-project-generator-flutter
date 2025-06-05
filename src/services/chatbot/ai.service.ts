import { GoogleGenerativeAI } from "@google/generative-ai";
import ejemploJson from './prompts/ejemplo-json.txt?raw';
import introduccion from './prompts/introduccion.txt?raw';
import restricciones from './prompts/restricciones.txt?raw';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
// Inicializar el modelo
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const initialHistory = [
    {
        role: "user",
        parts: [{ text: `${introduccion}\n\n${restricciones}\n\n${ejemploJson}`, },],
    },
    {
        role: "model",
        parts: [{ text: introduccion, },],
    },
];

// Historial de la conversación
let chatHistory = [...initialHistory];

export async function sendMessageToGemini(prompt: string): Promise<string> {
    try {
        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(prompt);
        const responseText = await result.response.text();

        return responseText;
    } catch (error) {
        return "Lo siento, ocurrió un error.";
    }
}