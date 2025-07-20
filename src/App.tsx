import React, { useState, useEffect } from 'react';
import { GameState, GameWord, GameRound, GameSettings } from './types';
import { getRandomWord } from './data/gameWords';
import GameCard from './components/GameCard';
import GuessResult from './components/GuessResult';
import ScoreBoard from './components/ScoreBoard';
import GameSettings from './components/GameSettings';
import './App.css';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentWord: null,
    userDescription: '',
    aiGuess: '',
    isCorrect: null,
    score: 0,
    attempts: 0,
    gameHistory: [],
    isLoading: false
  });

  const [settings, setSettings] = useState<GameSettings>({
    difficulty: 'medium',
    maxAttempts: 2,
    timeLimit: null,
    geminiApiKey: 'AIzaSyAwQe9Wkl-qP1ZCqhnHpwVau7ZyCKK2XnA',
    useGemini: true
  });

  const [gamePhase, setGamePhase] = useState<'settings' | 'playing' | 'result'>('settings');

  const startNewGame = () => {
    const newWord = getRandomWord(settings.difficulty);
    setGameState(prev => ({
      ...prev,
      currentWord: newWord,
      userDescription: '',
      aiGuess: '',
      isCorrect: null
    }));
    setGamePhase('playing');
  };

  const handleGuess = (aiGuess: string, isCorrect: boolean) => {
    if (!gameState.currentWord) return;

    const newRound: GameRound = {
      word: gameState.currentWord.word,
      userDescription: gameState.userDescription,
      aiGuess,
      isCorrect,
      timestamp: new Date()
    };

    setGameState(prev => ({
      ...prev,
      aiGuess,
      isCorrect,
      score: prev.score + (isCorrect ? 10 : 0),
      attempts: prev.attempts + 1,
      gameHistory: [...prev.gameHistory, newRound]
    }));

    setGamePhase('result');
  };

  const handleRestrictedWordUsed = (usedWords: string[]) => {
    // Penalty for using restricted words
    setGameState(prev => ({
      ...prev,
      score: Math.max(0, prev.score - 5)
    }));
  };

  const handleNextWord = () => {
    const newWord = getRandomWord(settings.difficulty);
    setGameState(prev => ({
      ...prev,
      currentWord: newWord,
      userDescription: '',
      aiGuess: '',
      isCorrect: null
    }));
    setGamePhase('playing');
  };

  const handleSettingsChange = (newSettings: GameSettings) => {
    setSettings(newSettings);
  };

  const resetGame = () => {
    setGameState({
      currentWord: null,
      userDescription: '',
      aiGuess: '',
      isCorrect: null,
      score: 0,
      attempts: 0,
      gameHistory: [],
      isLoading: false
    });
    setGamePhase('settings');
  };

  return (
    <div className="App">
      <div className="container">
        <header className="text-center mb-20">
          <h1 style={{ 
            fontSize: '3rem', 
            color: 'white', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            marginBottom: '10px'
          }}>
            🤖 AI Taboo Game 🎯
          </h1>
          <p style={{ 
            color: 'white', 
            fontSize: '1.2rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            Describe words without using restricted terms. Can the AI guess correctly?
          </p>
        </header>

        {gamePhase === 'settings' && (
          <GameSettings
            settings={settings}
            onSettingsChange={handleSettingsChange}
            onStartGame={startNewGame}
          />
        )}

        {gamePhase === 'playing' && gameState.currentWord && (
          <>
            <ScoreBoard
              score={gameState.score}
              attempts={gameState.attempts}
              gameHistory={gameState.gameHistory}
            />
            <GameCard
              currentWord={gameState.currentWord}
              onGuess={handleGuess}
              onRestrictedWordUsed={handleRestrictedWordUsed}
              useGemini={settings.useGemini}
              geminiApiKey={settings.geminiApiKey}
            />
            <div className="flex flex-center mt-20">
              <button className="btn btn-secondary" onClick={resetGame}>
                Reset Game
              </button>
            </div>
          </>
        )}

        {gamePhase === 'result' && gameState.currentWord && (
          <>
            <ScoreBoard
              score={gameState.score}
              attempts={gameState.attempts}
              gameHistory={gameState.gameHistory}
            />
            <GuessResult
              aiGuess={gameState.aiGuess}
              correctWord={gameState.currentWord.word}
              isCorrect={gameState.isCorrect!}
              userDescription={gameState.userDescription}
              onNextWord={handleNextWord}
            />
            <div className="flex flex-center mt-20">
              <button className="btn btn-secondary" onClick={resetGame}>
                New Game
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App; 