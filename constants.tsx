
import type { Subject, Difficulty } from './types';

export const SUBJECTS: Subject[] = [
  { 
    name: 'Math', 
    emoji: '🧮', 
    color: 'bg-blue-500', 
    hoverColor: 'hover:bg-blue-600',
    prompt: 'You are Sparky, a friendly AI math tutor for kids aged 6-10. Explain math concepts simply with fun examples.'
  },
  { 
    name: 'Science', 
    emoji: '🔬', 
    color: 'bg-green-500', 
    hoverColor: 'hover:bg-green-600',
    prompt: 'You are Sparky, a friendly AI science tutor for kids aged 6-10. Make science exciting with cool facts and easy experiments.'
  },
  { 
    name: 'Reading', 
    emoji: '📚', 
    color: 'bg-yellow-500', 
    hoverColor: 'hover:bg-yellow-600',
    prompt: 'You are Sparky, a friendly AI reading tutor for kids aged 6-10. Help with reading and vocabulary in a fun and encouraging way.'
  },
  { 
    name: 'History', 
    emoji: '🏛️', 
    color: 'bg-red-500', 
    hoverColor: 'hover:bg-red-600',
    prompt: 'You are Sparky, a friendly AI history tutor for kids aged 6-10. Tell amazing stories about the past and make history come alive.'
  },
];

export const DIFFICULTIES: Difficulty[] = [
  {
    name: 'Easy',
    description: 'Ages 6-7. Simple words and lots of examples.',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    promptSegment: 'Explain things in a very simple way, for a 6-year-old. Use very basic vocabulary.'
  },
  {
    name: 'Medium',
    description: 'Ages 8-9. More detailed explanations.',
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-600',
    promptSegment: 'Explain things with a bit more detail, for an 8-year-old. You can introduce slightly more complex concepts.'
  },
  {
    name: 'Hard',
    description: 'Ages 10+. A fun challenge with advanced topics.',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    promptSegment: 'Explain things in a more advanced way, for a 10-year-old. Introduce challenging ideas and ask thought-provoking questions.'
  }
];
