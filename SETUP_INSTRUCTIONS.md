# Setup Instructions for AI Taboo Game

## Option 1: Standalone HTML Version (Recommended for Quick Start)

The easiest way to run the game is to use the standalone HTML version:

1. **Open the file**: Double-click on `index.html` in the project folder
2. **Play immediately**: The game will open in your default web browser
3. **No installation required**: This version works without any additional software

## Option 2: React Version (For Developers)

If you want to run the full React version with all features:

### Prerequisites

1. **Install Node.js**: Download and install from [nodejs.org](https://nodejs.org/)
   - Choose the LTS version (recommended)
   - This will also install npm (Node Package Manager)

2. **Verify installation**: Open a terminal/command prompt and run:
   ```bash
   node --version
   npm --version
   ```

### Installation Steps

1. **Open terminal/command prompt** in the project folder

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and go to `http://localhost:3000`

### Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Creates a production build
- `npm test` - Runs the test suite

## Troubleshooting

### Common Issues

1. **"npm is not recognized"**
   - Solution: Install Node.js from [nodejs.org](https://nodejs.org/)

2. **Port 3000 is already in use**
   - Solution: The app will automatically try port 3001, or you can kill the process using port 3000

3. **Module not found errors**
   - Solution: Run `npm install` again to ensure all dependencies are installed

### Windows-Specific

If you're on Windows and having issues:

1. **Use PowerShell or Command Prompt** (not Git Bash)
2. **Run as Administrator** if you encounter permission issues
3. **Check Windows Defender** - it might block npm from downloading packages

### Alternative Installation Methods

If npm doesn't work, you can try:

1. **Using Yarn** (alternative to npm):
   ```bash
   npm install -g yarn
   yarn install
   yarn start
   ```

2. **Using npx** (if you have Node.js but not npm):
   ```bash
   npx create-react-app ai-taboo-game --template typescript
   ```

## Game Features

Both versions include:
- ✅ Three difficulty levels (Easy, Medium, Hard)
- ✅ AI word guessing simulation
- ✅ Restricted word detection
- ✅ Score tracking and statistics
- ✅ Responsive design for mobile and desktop
- ✅ Beautiful modern UI with animations

## File Structure

```
AI Taboo/
├── index.html              # Standalone version (ready to play)
├── src/                    # React source code
│   ├── components/         # React components
│   ├── data/              # Game word database
│   ├── services/          # AI service logic
│   └── ...
├── package.json           # Dependencies and scripts
├── README.md              # Project documentation
└── SETUP_INSTRUCTIONS.md  # This file
```

## Support

If you encounter any issues:

1. **Check the console** in your browser's developer tools for error messages
2. **Verify Node.js installation** with `node --version`
3. **Try the standalone HTML version** first to ensure the game works
4. **Check the README.md** for additional information

---

**Happy gaming! 🎮** 