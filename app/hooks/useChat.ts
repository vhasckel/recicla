import { useState } from 'react';
import { sendMessage } from '../lib/chatApi';
import type { Message } from '@/types/message';
import type { UserLocation } from '../lib/chatApi';

type TypingMessage = {
  id: 'typing';
  role: 'assistant';
  content: '';
  timestamp: Date;
};
export type ChatMessage = Message | TypingMessage;

const TYPING_ID = 'typing';
const RESPONSE_SPLIT_REGEX = /\n\s*\n|\[NOVO_BALAO\]/g;
const TYPING_DELAY_MS = 1500;

export function useChat(sessionId: string, userLocation?: UserLocation) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isSubmitting) return;

    const userInput = input;
    setIsSubmitting(true);
    setInput('');

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: userInput,
      role: 'user',
      timestamp: new Date(),
    };

    // Adiciona a mensagem do usuário e o indicador de "digitando"
    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: TYPING_ID, role: 'assistant', content: '', timestamp: new Date() },
    ]);

    try {
      const assistantResponse = await sendMessage(
        userInput,
        sessionId,
        userLocation
      );
      const responseParts = assistantResponse
        .split(RESPONSE_SPLIT_REGEX)
        .filter((part) => part.trim() !== '');

      // Remove o indicador de "digitando" inicial antes de processar as respostas
      setMessages((prev) => prev.filter((msg) => msg.id !== TYPING_ID));

      for (const [index, part] of responseParts.entries()) {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          content: part,
          role: 'assistant',
          timestamp: new Date(),
        };

        // Adiciona a parte da mensagem
        setMessages((prev) => [...prev, assistantMessage]);

        // Se não for a última parte, simula a digitação
        if (index < responseParts.length - 1) {
          setMessages((prev) => [
            ...prev,
            {
              id: TYPING_ID,
              role: 'assistant',
              content: '',
              timestamp: new Date(),
            },
          ]);
          await new Promise((resolve) => setTimeout(resolve, TYPING_DELAY_MS));
          setMessages((prev) => prev.filter((msg) => msg.id !== TYPING_ID));
        }
      }
    } catch (error) {
      console.error('Erro ao conectar com o assistente:', error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: 'Desculpe, ocorreu um erro. Por favor, tente novamente.',
        role: 'assistant',
        timestamp: new Date(),
      };
      // Remove o "digitando" e adiciona a mensagem de erro
      setMessages((prev) => [
        ...prev.filter((msg) => msg.id !== TYPING_ID),
        errorMessage,
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    isSubmitting,
    handleSubmit,
  };
}
