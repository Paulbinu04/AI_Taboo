export class GeminiService {
  private static apiKey: string | null = null;
  private static baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  static async guessWord(description: string, restrictedWords: string[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not set. Please add your API key in the settings.');
    }

    const prompt = this.buildPrompt(description, restrictedWords);
    
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response from Gemini API');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      return this.extractWordFromResponse(aiResponse);
      
    } catch (error) {
      console.error('Gemini API error:', error);
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          throw new Error('Gemini API endpoint not found. Please check your API key and try again.');
        } else if (error.message.includes('403')) {
          throw new Error('API key is invalid or has insufficient permissions.');
        } else if (error.message.includes('429')) {
          throw new Error('API rate limit exceeded. Please wait a moment and try again.');
        } else {
          throw new Error(`Gemini API error: ${error.message}`);
        }
      } else {
        throw new Error('Unknown Gemini API error');
      }
    }
  }

  static async validateDescription(description: string, restrictedWords: string[]): Promise<{
    isValid: boolean;
    usedRestrictedWords: string[];
    suggestions: string[];
  }> {
    if (!this.apiKey) {
      // Fallback to basic validation if no API key
      const lowerDescription = description.toLowerCase();
      const usedRestrictedWords = restrictedWords.filter(word => 
        lowerDescription.includes(word.toLowerCase())
      );
      
      return {
        isValid: usedRestrictedWords.length === 0,
        usedRestrictedWords,
        suggestions: []
      };
    }

    const prompt = `Check if this description uses any of these restricted words: ${restrictedWords.join(', ')}
    
Description: "${description}"

If any restricted words are used, list them and suggest alternatives. If no restricted words are used, respond with "VALID".

Respond in this exact format:
RESTRICTED_WORDS: [list of used restricted words, or "none"]
SUGGESTIONS: [list of alternative words, or "none"]`;

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      return this.parseValidationResponse(aiResponse, restrictedWords);
      
    } catch (error) {
      console.error('Gemini validation error:', error);
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          throw new Error('Gemini API endpoint not found. Please check your API key and try again.');
        } else if (error.message.includes('403')) {
          throw new Error('API key is invalid or has insufficient permissions.');
        } else if (error.message.includes('429')) {
          throw new Error('API rate limit exceeded. Please wait a moment and try again.');
        } else {
          throw new Error(`Gemini API error: ${error.message}`);
        }
      } else {
        throw new Error('Unknown Gemini API error');
      }
    }
  }

  private static buildPrompt(description: string, restrictedWords: string[]): string {
    return `You are playing a word guessing game. The user has described a word without using certain restricted terms.

Restricted words that were NOT used: ${restrictedWords.join(', ')}

User's description: "${description}"

Based on this description, guess what word the user is trying to describe. 

Rules:
1. Respond with ONLY the guessed word (no explanations, no punctuation)
2. Make your best guess based on the description
3. If you're very uncertain, respond with "unknown"
4. The word should be a common English word that matches the description

Examples:
- Description: "A round food with melted dairy on top, often delivered to homes"
- Response: pizza

- Description: "A four-legged companion that barks and fetches balls"
- Response: dog

Your guess:`;
  }

  private static extractWordFromResponse(response: string): string {
    // Clean up the response to extract just the word
    const cleaned = response.trim().toLowerCase();
    
    // Remove common prefixes/suffixes that AI might add
    const word = cleaned
      .replace(/^the word is:?\s*/i, '')
      .replace(/^i think it's:?\s*/i, '')
      .replace(/^my guess is:?\s*/i, '')
      .replace(/^the answer is:?\s*/i, '')
      .replace(/^it's:?\s*/i, '')
      .replace(/^answer:?\s*/i, '')
      .replace(/^guess:?\s*/i, '')
      .replace(/\.$/, '')
      .replace(/^["']|["']$/g, '')
      .trim();

    return word || 'unknown';
  }

  private static parseValidationResponse(response: string, restrictedWords: string[]): {
    isValid: boolean;
    usedRestrictedWords: string[];
    suggestions: string[];
  } {
    const lines = response.split('\n');
    let usedRestrictedWords: string[] = [];
    let suggestions: string[] = [];

    for (const line of lines) {
      if (line.startsWith('RESTRICTED_WORDS:')) {
        const words = line.replace('RESTRICTED_WORDS:', '').trim();
        if (words !== 'none') {
          usedRestrictedWords = words.split(',').map(w => w.trim());
        }
      } else if (line.startsWith('SUGGESTIONS:')) {
        const words = line.replace('SUGGESTIONS:', '').trim();
        if (words !== 'none') {
          suggestions = words.split(',').map(w => w.trim());
        }
      }
    }

    return {
      isValid: usedRestrictedWords.length === 0,
      usedRestrictedWords,
      suggestions
    };
  }

  static isConfigured(): boolean {
    return this.apiKey !== null && this.apiKey.trim() !== '';
  }
} 