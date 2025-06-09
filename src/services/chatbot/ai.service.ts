import { GoogleGenerativeAI } from "@google/generative-ai";
import ejemploJson from './prompts/ejemplo-json.txt?raw';
import introduccion from './prompts/introduccion.txt?raw';
import restricciones from './prompts/restricciones.txt?raw';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

type Part = { text: string } | { inlineData: { mimeType: string; data: string } };

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

// Función para convertir imagen a base64
function fileToGenerativePart(file: File): Promise<Part> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = (reader.result as string).split(',')[1];
            console.log('[Base64] Imagen convertida:', base64.substring(0, 100), '...');
            resolve({
                inlineData: {
                    data: base64,
                    mimeType: file.type,
                },
            });
        };

        reader.readAsDataURL(file);
    });
}

export async function sendMessageToGemini(
    prompt: string,
    image?: File
): Promise<string> {
    try {
        const chat = model.startChat({ history: chatHistory });

        if (image) {
            console.log('[Gemini] Imagen recibida para enviar:', image.name, image.type);
            const imagePart = await fileToGenerativePart(image);
            console.log('[Gemini] Imagen convertida a inlineData:', imagePart);
            const result = await chat.sendMessage([
                { text: prompt },
                imagePart
            ]);
            const responseText = await result.response.text();
            console.log('[Gemini] Respuesta del modelo con imagen:', responseText);
            return responseText;
        } else {
            const result = await chat.sendMessage(prompt);
            return await result.response.text();
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Lo siento, ocurrió un error al procesar tu imagen.";
    }
}