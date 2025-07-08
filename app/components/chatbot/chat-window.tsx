import React, { RefObject } from 'react';
import { ChatHeader } from './chat-header';
import { MessageList } from './message-list';
import { ChatInput } from './chat-input';
import { Message } from '@/types/message';

interface ChatWindowProps {
  isMobile: boolean;
  messages: Message[];
  messagesEndRef: RefObject<HTMLDivElement>;
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

export function ChatWindow({
  isMobile,
  messages,
  messagesEndRef,
  input,
  setInput,
  onSubmit,
  onClose,
}: ChatWindowProps) {
  return (
    <div
      className={`flex flex-col bg-white shadow-xl ${
        isMobile
          ? 'fixed inset-0 z-[999]'
          : 'fixed bottom-20 right-4 z-[999] h-[600px] w-96 rounded-lg'
      }`}
    >
      <ChatHeader onClose={onClose} />
      <MessageList messages={messages} messagesEndRef={messagesEndRef} />
      <ChatInput input={input} setInput={setInput} onSubmit={onSubmit} />
    </div>
  );
}
