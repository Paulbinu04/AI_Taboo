# 🤖 AI Taboo Game 🎯

A modern web application where users describe words while avoiding restricted terms, and an AI attempts to guess the correct word. This is a digital twist on the classic Taboo game!

## 🎮 How to Play

1. **Select Settings**: Choose your difficulty level (Easy, Medium, Hard) and number of attempts per word
2. **Describe the Word**: You'll see a target word and a list of restricted words you cannot use
3. **Submit Description**: Write a description without using any of the restricted terms
4. **AI Guesses**: The AI will analyze your description and attempt to guess the word
5. **Score Points**: Earn points for successful guesses and lose points for using restricted words

## ✨ Features

- **Three Difficulty Levels**: Easy, Medium, and Hard with progressively challenging words
- **Smart AI Guessing**: Simulated AI that analyzes descriptions and makes educated guesses
- **Restricted Word Detection**: Real-time validation to catch forbidden terms
- **Score Tracking**: Keep track of your performance with accuracy statistics
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Game History**: Visual indicators of recent performance

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-taboo-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── GameCard.tsx     # Main game interface
│   ├── GuessResult.tsx  # Results display
│   ├── ScoreBoard.tsx   # Score tracking
│   └── GameSettings.tsx # Settings interface
├── data/
│   └── gameWords.ts     # Word database
├── services/
│   └── aiService.ts     # AI guessing logic
├── types.ts            # TypeScript definitions
├── App.tsx             # Main application
└── index.tsx           # Entry point
```

## 🎯 Game Mechanics

### Scoring System
- **Correct Guess**: +10 points
- **Using Restricted Words**: -5 points
- **Accuracy**: Percentage of successful guesses

### Difficulty Levels
- **Easy**: Common everyday words (pizza, dog, car)
- **Medium**: More specific concepts (computer, mountain, restaurant)
- **Hard**: Complex abstract concepts (democracy, philosophy, metaphysics)

### AI Guessing Logic
The AI uses a scoring system based on:
- Word associations and synonyms
- Common descriptive terms
- Context clues from your description
- Pattern matching against known words

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **CSS3** with modern animations
- **Responsive Design** for mobile and desktop
- **Local Storage** for game persistence (future enhancement)

## 🔮 Future Enhancements

- [ ] Integration with real AI services (OpenAI, Claude)
- [ ] Multiplayer mode
- [ ] Custom word categories
- [ ] Timer functionality
- [ ] Sound effects and animations
- [ ] Leaderboards
- [ ] User accounts and statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic Taboo board game
- Built with modern web technologies
- Designed for educational and entertainment purposes

---

**Have fun playing! 🎉** 