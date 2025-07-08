import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '@/types/message';

interface MessageBubbleProps extends Message {}

export function MessageBubble({ content, role, id }: MessageBubbleProps) {
  if (id === 'typing') {
    return (
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-lg bg-gray-100 p-3 text-gray-800">
          <span className="flex gap-1">
            <span className="typing-dot h-2 w-2 rounded-full bg-gray-400"></span>
            <span className="typing-dot h-2 w-2 rounded-full bg-gray-400"></span>
            <span className="typing-dot h-2 w-2 rounded-full bg-gray-400"></span>
          </span>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`flex ${
        role === 'user' ? 'justify-end' : 'justify-start'
      } animate-bubble-in`}
    >
      <div
        className={`prose max-w-[80%] rounded-lg p-3 text-sm ${
          role === 'user'
            ? 'prose-invert bg-primary text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
