
import React, { useState, useRef, useEffect } from 'react';
import type { Message, Subject } from '../types';
import MessageComponent from './Message';
import ThinkingIndicator from './ThinkingIndicator';
// FIX: Import TutorIcon to resolve reference error.
import { SendIcon, BackIcon, TutorIcon } from './icons';

interface ChatWindowProps {
  subject: Subject;
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ subject, messages, isLoading, onSendMessage, onBack }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-full flex flex-col bg-white rounded-2xl shadow-lg animate-fade-in overflow-hidden">
      <header className="flex items-center p-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <BackIcon className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex items-center ml-4">
          <span className="text-3xl mr-3">{subject.emoji}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{subject.name} Tutor</h2>
            <p className="text-sm text-green-500 font-semibold">Online</p>
          </div>
        </div>
      </header>
      
      <div className="flex-1 p-6 overflow-y-auto bg-sky-50">
        {messages.map((msg, index) => (
          <MessageComponent key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex items-start gap-3 my-4">
               <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <TutorIcon className="w-6 h-6 text-gray-600" />
                </div>
               <div className="max-w-md px-4 py-3 rounded-2xl shadow-sm bg-white text-gray-800 rounded-tl-none">
                  <ThinkingIndicator />
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-3 bg-blue-500 text-white rounded-full transition-colors duration-200 enabled:hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
