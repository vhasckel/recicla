import React, { RefObject } from 'react';
import { MessageBubble } from './message-bubble';
import { Message } from '@/types/message';

interface MessageListProps {
  messages: Message[];
  messagesEndRef: RefObject<HTMLDivElement>;
}

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          id={message.id}
          content={message.content}
          role={message.role}
          timestamp={message.timestamp}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
