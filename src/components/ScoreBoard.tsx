import React from 'react';
import { GameRound } from '../types';

interface ScoreBoardProps {
  score: number;
  attempts: number;
  gameHistory: GameRound[];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, attempts, gameHistory }) => {
  const correctGuesses = gameHistory.filter(round => round.isCorrect).length;
  const accuracy = attempts > 0 ? Math.round((correctGuesses / attempts) * 100) : 0;

  return (
    <div className="score-display">
      <div className="flex flex-center gap-20">
        <div>
          <h3>Score</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>{score}</p>
        </div>
        <div>
          <h3>Attempts</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>{attempts}</p>
        </div>
        <div>
          <h3>Accuracy</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>{accuracy}%</p>
        </div>
      </div>
      
      {gameHistory.length > 0 && (
        <div className="mt-20">
          <h3>Recent Results:</h3>
          <div className="flex flex-center gap-10 mt-20">
            {gameHistory.slice(-5).map((round, index) => (
              <div
                key={index}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: round.isCorrect ? '#28a745' : '#dc3545',
                  display: 'inline-block'
                }}
                title={`${round.word}: ${round.isCorrect ? 'Correct' : 'Incorrect'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard; 