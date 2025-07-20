import { GameWord } from '../types';

// Simulated AI guessing logic
// In a real implementation, this would connect to an actual AI service
export class AIService {
  static async guessWord(description: string, restrictedWords: string[]): Promise<string> {
    throw new Error('Local AI logic has been removed. This game now requires Google Gemini API.');
  }

  static async validateDescription(description: string, restrictedWords: string[]): Promise<{
    isValid: boolean;
    usedRestrictedWords: string[];
    suggestions: string[];
  }> {
    throw new Error('Local AI logic has been removed. This game now requires Google Gemini API.');
  }
} 