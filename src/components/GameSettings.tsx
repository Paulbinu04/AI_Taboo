import React from 'react';
import { GameSettings } from '../types';

interface GameSettingsProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
  onStartGame: () => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({ settings, onSettingsChange, onStartGame }) => {
  const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard') => {
    onSettingsChange({ ...settings, difficulty });
  };

  const handleMaxAttemptsChange = (maxAttempts: number) => {
    onSettingsChange({ ...settings, maxAttempts });
  };

  const handleGeminiToggle = (useGemini: boolean) => {
    onSettingsChange({ ...settings, useGemini });
  };

  const handleApiKeyChange = (apiKey: string) => {
    onSettingsChange({ ...settings, geminiApiKey: apiKey });
  };

  return (
    <div className="card">
      <h2 className="text-center mb-20">Game Settings</h2>
      
      <div className="mb-20">
        <h3>Select Difficulty:</h3>
        <div className="flex flex-center gap-10 mt-20">
          {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
            <button
              key={difficulty}
              className={`btn ${settings.difficulty === difficulty ? 'btn-success' : 'btn-secondary'}`}
              onClick={() => handleDifficultyChange(difficulty)}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-20">
        <h3>Max Attempts per Word:</h3>
        <div className="flex flex-center gap-10 mt-20">
          {[1, 2, 3].map((attempts) => (
            <button
              key={attempts}
              className={`btn ${settings.maxAttempts === attempts ? 'btn-success' : 'btn-secondary'}`}
              onClick={() => handleMaxAttemptsChange(attempts)}
            >
              {attempts}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h3>AI Configuration:</h3>
        <div className="flex flex-center gap-10 mt-20">
                      <button
              className={`btn ${!settings.useGemini ? 'btn-secondary' : 'btn-success'}`}
              onClick={() => handleGeminiToggle(false)}
            >
              Simulated AI
            </button>
            <button
              className={`btn ${settings.useGemini ? 'btn-success' : 'btn-secondary'}`}
              onClick={() => handleGeminiToggle(true)}
            >
              Google Gemini
            </button>
        </div>
        
        {settings.useGemini && (
          <div className="mt-20">
            <label htmlFor="apiKey" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Gemini API Key:
            </label>
            <input
              id="apiKey"
              type="password"
              className="input"
              placeholder="Enter your Gemini API key"
              value={settings.geminiApiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
            />
            <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
              Get your API key from{' '}
              <a 
                href="https://makersuite.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#667eea', textDecoration: 'underline' }}
              >
                Google AI Studio
              </a>
            </p>
          </div>
        )}
      </div>
      
      <div className="mb-20">
        <h3>Difficulty Levels:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <strong>Easy:</strong> Common everyday words with simple restrictions
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <strong>Medium:</strong> More specific words with moderate restrictions
          </li>
          <li style={{ padding: '8px 0' }}>
            <strong>Hard:</strong> Complex concepts with challenging restrictions
          </li>
        </ul>
      </div>

              <div className="mb-20">
          <h3>AI Options:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <strong>Google Gemini:</strong> Advanced AI understanding, requires API key (Recommended)
            </li>
            <li style={{ padding: '8px 0' }}>
              <strong>Simulated AI:</strong> Fast, works offline, basic word matching (Fallback)
            </li>
          </ul>
        </div>
      
      <div className="flex flex-center mt-20">
        <button 
          className="btn btn-success" 
          onClick={onStartGame}
          disabled={settings.useGemini && !settings.geminiApiKey.trim()}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameSettings; 