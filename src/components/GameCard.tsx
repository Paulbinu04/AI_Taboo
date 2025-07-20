import React, { useState } from 'react';
import { GameWord } from '../types';
import { AIService } from '../services/aiService';
import { GeminiService } from '../services/geminiService';

interface GameCardProps {
  currentWord: GameWord;
  onGuess: (aiGuess: string, isCorrect: boolean) => void;
  onRestrictedWordUsed: (usedWords: string[]) => void;
  useGemini: boolean;
  geminiApiKey: string;
}

const GameCard: React.FC<GameCardProps> = ({ 
  currentWord, 
  onGuess, 
  onRestrictedWordUsed, 
  useGemini, 
  geminiApiKey 
}) => {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setValidationError('Please enter a description');
      return;
    }

    setIsLoading(true);
    setValidationError(null);
    setSuggestions([]);

    try {
      // Configure Gemini if using it
      if (useGemini && geminiApiKey) {
        GeminiService.setApiKey(geminiApiKey);
      }

      // First validate the description
      const validation = useGemini && geminiApiKey
        ? await GeminiService.validateDescription(description, currentWord.restrictedWords)
        : await AIService.validateDescription(description, currentWord.restrictedWords);
      
      if (!validation.isValid) {
        setValidationError(`You used restricted words: ${validation.usedRestrictedWords.join(', ')}`);
        setSuggestions(validation.suggestions);
        onRestrictedWordUsed(validation.usedRestrictedWords);
        setIsLoading(false);
        return;
      }

      // Get AI guess
      const aiGuess = useGemini && geminiApiKey
        ? await GeminiService.guessWord(description, currentWord.restrictedWords)
        : await AIService.guessWord(description, currentWord.restrictedWords);
      
      const isCorrect = aiGuess.toLowerCase() === currentWord.word.toLowerCase();
      
      onGuess(aiGuess, isCorrect);
      setDescription('');
      
    } catch (error) {
      if (error instanceof Error) {
        setValidationError(error.message);
      } else {
        setValidationError('An error occurred while processing your description');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setValidationError(null);
    setSuggestions([]);
  };

  return (
    <div className="card">
      <h2 className="text-center mb-20">Describe this word without using the restricted terms:</h2>
      
      <div className="target-word">
        {currentWord.word.toUpperCase()}
      </div>
      
      <div className="mb-20">
        <h3>Restricted Words:</h3>
        <div className="flex flex-center gap-10 mt-20">
          {currentWord.restrictedWords.map((word, index) => (
            <span key={index} className="restricted-word">
              {word}
            </span>
          ))}
        </div>
      </div>

      {useGemini && (
        <div className="mb-20" style={{ 
          background: 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)', 
          color: 'white', 
          padding: '12px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          🤖 Using Google Gemini AI
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          className="input"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Describe the word without using any of the restricted terms above..."
          rows={4}
          disabled={isLoading}
        />
        
        {validationError && (
          <div className="guess-result guess-incorrect">
            {validationError}
            {suggestions.length > 0 && (
              <div className="mt-20">
                <strong>Suggestions:</strong> {suggestions.join(', ')}
              </div>
            )}
          </div>
        )}
        
        <div className="flex flex-center mt-20">
          <button
            type="submit"
            className="btn"
            disabled={isLoading || !description.trim()}
          >
            {isLoading ? 'AI is thinking...' : 'Submit Description'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameCard; 