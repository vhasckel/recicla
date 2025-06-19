import React from 'react';

interface MessageBubbleProps {
  content: string;
  role: 'user' | 'assistant';
}

export function MessageBubble({ content, role }: MessageBubbleProps) {
  return (
    <div
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          role === 'user'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
