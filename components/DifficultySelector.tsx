
import React from 'react';
import type { Subject, Difficulty } from '../types';
import { DIFFICULTIES } from '../constants';
import { BackIcon } from './icons';

interface DifficultySelectorProps {
  subject: Subject;
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ subject, onSelect, onBack }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg animate-fade-in">
      <div className="relative text-center mb-8">
        <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 transition-colors" aria-label="Go back to subject selection">
            <BackIcon className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex justify-center items-center">
            <span className="text-5xl mr-4" aria-hidden="true">{subject.emoji}</span>
            <h1 className="text-3xl font-bold text-gray-800">Choose a Difficulty</h1>
        </div>
        <p className="text-gray-600 mt-2 text-lg">How challenging should the {subject.name} lesson be?</p>
      </div>
      <div className="flex flex-col gap-4">
        {DIFFICULTIES.map((difficulty) => (
          <button
            key={difficulty.name}
            onClick={() => onSelect(difficulty)}
            className={`w-full text-left p-6 rounded-xl text-white font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${difficulty.color} ${difficulty.hoverColor} focus:ring-blue-300`}
          >
            <span className="text-xl">{difficulty.name}</span>
            <p className="font-normal text-base mt-1">{difficulty.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
