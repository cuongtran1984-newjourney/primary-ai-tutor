
import React from 'react';

const ThinkingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse"></div>
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      <span className="text-sm text-gray-500 ml-2">Sparky is thinking...</span>
    </div>
  );
};

export default ThinkingIndicator;
