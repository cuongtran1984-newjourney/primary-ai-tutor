
import React from 'react';
import type { Subject } from '../types';
import { SUBJECTS } from '../constants';
import { TutorIcon } from './icons';

interface SubjectSelectorProps {
  onSelect: (subject: Subject) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg animate-fade-in">
      <div className="text-center mb-8">
        <TutorIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Hello! I'm Sparky!</h1>
        <p className="text-gray-600 mt-2 text-lg">What would you like to learn about today?</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {SUBJECTS.map((subject) => (
          <button
            key={subject.name}
            onClick={() => onSelect(subject)}
            className={`flex flex-col items-center justify-center p-6 rounded-xl text-white font-bold text-xl transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${subject.color} ${subject.hoverColor} focus:ring-blue-300`}
          >
            <span className="text-4xl mb-2">{subject.emoji}</span>
            <span>{subject.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;
