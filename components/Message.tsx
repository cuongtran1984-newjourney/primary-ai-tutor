
import React from 'react';
import type { Message } from '../types';
import { TutorIcon } from './icons';

interface MessageProps {
  message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-3 my-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
      {isModel && (
        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <TutorIcon className="w-6 h-6 text-gray-600" />
        </div>
      )}
      <div 
        className={`max-w-md lg:max-w-xl px-4 py-3 rounded-2xl shadow-sm ${
          isModel ? 'bg-white text-gray-800 rounded-tl-none' : 'bg-blue-500 text-white rounded-br-none'
        }`}
      >
        <p className="text-base whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageComponent;
