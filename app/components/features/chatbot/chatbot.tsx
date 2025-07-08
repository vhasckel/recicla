'use client';

import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ChatWindow } from '../../chatbot/chat-window';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface UserLocation {
  lat: number;
  lng: number;
}

export function Chatbot() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Capturar localização do usuário quando o chatbot é aberto
  useEffect(() => {
    if (isOpen && !userLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            console.log('Localização capturada:', position.coords);
          },
          (error) => {
            console.log('Erro ao obter localização:', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 60000,
          }
        );
      }
    }
  }, [isOpen, userLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setIsTyping(true);
    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: 'typing',
        content: '',
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);
    setInput('');

    try {
      // Preparar dados para envio
      const requestData: any = {
        prompt: input,
        session_id: 'default_user', // Você pode implementar sessões únicas por usuário
      };

      // Adicionar localização se disponível
      if (userLocation) {
        requestData.user_location = userLocation;
      }

      // Chamada ao backend Flask
      const response = await fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      const assistantResponse =
        data.response || 'Erro ao obter resposta da IA.';
      const cleanedResponse = assistantResponse.replace(/\[NOVO_BALAO\]/g, '');
      const responseParts = cleanedResponse
        .split(/\n\s*\n/)
        .filter((part: string) => part.trim() !== ''); // Filtra partes vazias

      setMessages((prev) => prev.filter((msg) => msg.id !== 'typing'));
      setIsTyping(false);

      // Envia a primeira parte da mensagem imediatamente
      if (responseParts.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-0`,
            content: responseParts[0],
            role: 'assistant',
            timestamp: new Date(),
          },
        ]);
      }

      // Envia as partes restantes com a animação de "digitando" entre elas
      for (let i = 1; i < responseParts.length; i++) {
        // Mostra a animação de "digitando"
        setMessages((prev) => [
          ...prev,
          {
            id: 'typing',
            content: '',
            role: 'assistant',
            timestamp: new Date(),
          },
        ]);

        // Pausa para o "respiro"
        await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5s de pausa

        const part = responseParts[i];

        // Substitui a animação pela próxima mensagem
        setMessages((prev) => [
          ...prev.filter((msg) => msg.id !== 'typing'),
          {
            id: `${Date.now()}-${i}`,
            content: part,
            role: 'assistant',
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Erro ao conectar com o assistente.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [
        ...prev.filter((msg) => msg.id !== 'typing'),
        assistantMessage,
      ]);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-50 rounded-full bg-primary p-4 text-white shadow-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
      {isOpen && (
        <ChatWindow
          isMobile={isMobile}
          messages={messages}
          messagesEndRef={messagesEndRef}
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
