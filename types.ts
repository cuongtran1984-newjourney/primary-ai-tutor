
export type Role = 'user' | 'model';

export interface Message {
  role: Role;
  text: string;
}

export interface Subject {
  name: string;
  emoji: string;
  color: string;
  hoverColor: string;
  prompt: string;
}

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface Difficulty {
  name: DifficultyLevel;
  description: string;
  color: string;
  hoverColor: string;
  promptSegment: string;
}
