'use client';

import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useChat } from '@/hooks/useChat';
import { ChatWindow } from '../../chatbot/chat-window';
import { useUserLocation } from '@/hooks/useUserLocation';

export function Chatbot() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef(crypto.randomUUID());

  const { location: userLocation, error: locationError } =
    useUserLocation(isOpen);

  const { messages, input, setInput, isSubmitting, handleSubmit } = useChat(
    sessionIdRef.current,
    userLocation ?? undefined
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (locationError) {
      console.log('Não foi possível obter a localização para o chat.');
    }
  }, [locationError]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-50 rounded-full bg-primary p-4 text-white shadow-lg transition-colors"
          aria-label="Abrir chat"
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
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}
