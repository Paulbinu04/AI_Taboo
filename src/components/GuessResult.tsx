import React from 'react';

interface GuessResultProps {
  aiGuess: string;
  correctWord: string;
  isCorrect: boolean;
  userDescription: string;
  onNextWord: () => void;
}

const GuessResult: React.FC<GuessResultProps> = ({ 
  aiGuess, 
  correctWord, 
  isCorrect, 
  userDescription,
  onNextWord 
}) => {
  return (
    <div className="card">
      <h2 className="text-center mb-20">AI's Guess Result</h2>
      
      <div className="mb-20">
        <h3>Your Description:</h3>
        <p className="mt-20" style={{ fontStyle: 'italic', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          "{userDescription}"
        </p>
      </div>
      
      <div className="mb-20">
        <h3>AI Guessed:</h3>
        <div className="target-word" style={{ backgroundColor: isCorrect ? '#28a745' : '#dc3545' }}>
          {aiGuess.toUpperCase()}
        </div>
      </div>
      
      <div className={`guess-result ${isCorrect ? 'guess-correct' : 'guess-incorrect'}`}>
        <h3 className="text-center">
          {isCorrect ? '🎉 Correct! 🎉' : '❌ Incorrect! ❌'}
        </h3>
        {!isCorrect && (
          <p className="text-center mt-20">
            The correct word was: <strong>{correctWord.toUpperCase()}</strong>
          </p>
        )}
      </div>
      
      <div className="flex flex-center mt-20">
        <button className="btn" onClick={onNextWord}>
          Next Word
        </button>
      </div>
    </div>
  );
};

export default GuessResult; 