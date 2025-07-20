export interface GameWord {
  word: string;
  restrictedWords: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface GameState {
  currentWord: GameWord | null;
  userDescription: string;
  aiGuess: string;
  isCorrect: boolean | null;
  score: number;
  attempts: number;
  gameHistory: GameRound[];
  isLoading: boolean;
}

export interface GameRound {
  word: string;
  userDescription: string;
  aiGuess: string;
  isCorrect: boolean;
  timestamp: Date;
}

export interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  maxAttempts: number;
  timeLimit: number | null;
  geminiApiKey: string;
  useGemini: boolean;
} 