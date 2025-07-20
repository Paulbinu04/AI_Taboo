import { GameWord } from '../types';

export const gameWords: GameWord[] = [
  // Easy words
  {
    word: "pizza",
    restrictedWords: ["cheese", "tomato", "dough", "Italian", "food"],
    difficulty: "easy",
    category: "food"
  },
  {
    word: "dog",
    restrictedWords: ["pet", "animal", "bark", "puppy", "four legs"],
    difficulty: "easy",
    category: "animals"
  },
  {
    word: "car",
    restrictedWords: ["vehicle", "drive", "wheels", "transport", "road"],
    difficulty: "easy",
    category: "transportation"
  },
  {
    word: "book",
    restrictedWords: ["read", "pages", "story", "library", "text"],
    difficulty: "easy",
    category: "objects"
  },
  {
    word: "tree",
    restrictedWords: ["plant", "leaves", "nature", "green", "wood"],
    difficulty: "easy",
    category: "nature"
  },
  {
    word: "phone",
    restrictedWords: ["call", "mobile", "communication", "device", "screen"],
    difficulty: "easy",
    category: "technology"
  },
  {
    word: "house",
    restrictedWords: ["home", "live", "building", "roof", "family"],
    difficulty: "easy",
    category: "places"
  },
  {
    word: "water",
    restrictedWords: ["drink", "liquid", "wet", "clear", "thirst"],
    difficulty: "easy",
    category: "nature"
  },

  // Medium words
  {
    word: "computer",
    restrictedWords: ["machine", "digital", "screen", "keyboard", "internet"],
    difficulty: "medium",
    category: "technology"
  },
  {
    word: "mountain",
    restrictedWords: ["peak", "climb", "high", "rock", "nature"],
    difficulty: "medium",
    category: "nature"
  },
  {
    word: "restaurant",
    restrictedWords: ["eat", "food", "dining", "menu", "service"],
    difficulty: "medium",
    category: "places"
  },
  {
    word: "airplane",
    restrictedWords: ["fly", "sky", "travel", "wings", "pilot"],
    difficulty: "medium",
    category: "transportation"
  },
  {
    word: "basketball",
    restrictedWords: ["sport", "ball", "hoop", "game", "court"],
    difficulty: "medium",
    category: "sports"
  },
  {
    word: "guitar",
    restrictedWords: ["music", "instrument", "strings", "play", "sound"],
    difficulty: "medium",
    category: "music"
  },
  {
    word: "beach",
    restrictedWords: ["sand", "ocean", "swim", "sun", "vacation"],
    difficulty: "medium",
    category: "places"
  },
  {
    word: "chocolate",
    restrictedWords: ["sweet", "candy", "brown", "dessert", "cocoa"],
    difficulty: "medium",
    category: "food"
  },

  // Hard words
  {
    word: "democracy",
    restrictedWords: ["government", "vote", "people", "election", "freedom"],
    difficulty: "hard",
    category: "politics"
  },
  {
    word: "philosophy",
    restrictedWords: ["thinking", "ideas", "wisdom", "knowledge", "study"],
    difficulty: "hard",
    category: "education"
  },
  {
    word: "symphony",
    restrictedWords: ["orchestra", "music", "classical", "concert", "instruments"],
    difficulty: "hard",
    category: "music"
  },
  {
    word: "archaeology",
    restrictedWords: ["dig", "ancient", "history", "artifacts", "discover"],
    difficulty: "hard",
    category: "science"
  },
  {
    word: "entrepreneur",
    restrictedWords: ["business", "start", "company", "owner", "create"],
    difficulty: "hard",
    category: "business"
  },
  {
    word: "biodiversity",
    restrictedWords: ["species", "nature", "variety", "life", "ecosystem"],
    difficulty: "hard",
    category: "science"
  },
  {
    word: "renaissance",
    restrictedWords: ["period", "art", "history", "rebirth", "culture"],
    difficulty: "hard",
    category: "history"
  },
  {
    word: "metaphysics",
    restrictedWords: ["philosophy", "reality", "existence", "being", "abstract"],
    difficulty: "hard",
    category: "philosophy"
  }
];

export const getRandomWord = (difficulty?: 'easy' | 'medium' | 'hard'): GameWord => {
  const filteredWords = difficulty 
    ? gameWords.filter(word => word.difficulty === difficulty)
    : gameWords;
  
  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomIndex];
};

export const getWordsByCategory = (category: string): GameWord[] => {
  return gameWords.filter(word => word.category === category);
};

export const getCategories = (): string[] => {
  return [...new Set(gameWords.map(word => word.category))];
}; 