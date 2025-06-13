import type { SpeechRecognition, SpeechRecognitionErrorEvent, SpeechRecognitionEvent } from '@/types/PromptInput';
import { useRef, useState } from 'react';

export function useSpeechRecognition(
  onTranscript: (text: string) => void,
  onError?: (msg: string) => void,
  onEndTranscript?: (finalText: string) => void // nuevo parámetro
) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const lastTranscriptRef = useRef<string>(''); // guarda el último texto

  const startRecognition = () => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      const msg = 'Lo siento, tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.';
      console.error(msg);
      alert(msg);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'es-MX';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(r => (r as SpeechRecognitionResult)[0].transcript)
        .join('');
      lastTranscriptRef.current = transcript;
      onTranscript(transcript); // ← sigue actualizando si se desea mostrar
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Error en reconocimiento:', event.error);
      setIsRecording(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (onError) onError(event.error);
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start(); // reinicia
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        const finalText = lastTranscriptRef.current.trim();
        if (finalText && onEndTranscript) {
          onEndTranscript(finalText); // llama al callback cuando termina
        }
        lastTranscriptRef.current = '';
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);

    timeoutRef.current = setTimeout(() => {
      recognition.stop();
      setIsRecording(false);
      alert('Tiempo máximo de grabación alcanzado.');
    }, 120000);
  };

  const stopRecognition = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return { isRecording, startRecognition, stopRecognition };
}
