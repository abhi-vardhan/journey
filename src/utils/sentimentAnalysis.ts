
// Type definitions
export type Mood = 'happy' | 'sad' | 'neutral' | 'angry' | 'stressed';

export interface SentimentResult {
  mood: Mood;
  score: number; // 0 to 1
  keywords: string[];
}

// Gemini AI integration for sentiment analysis
export async function analyzeSentiment(text: string): Promise<SentimentResult> {
  try {
    const API_KEY = "AIzaSyARE0b72AwVmHkE4T3LbGLuT4Qe7-p4nGw";
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    
    const prompt = `
      Analyze the sentiment in the following journal entry by identifying the primary mood, 
      which must be exactly one of the following: happy, sad, stressed, angry, or stressed. 
      Additionally, rate the intensity of this mood on a scale from 0 to 1, where 1 represents 
      the strongest intensity. Extract key emotional words and phrases that directly contribute t
      o this analysis. Beyond explicit emotion words, also examine indirect emotional cues such as
       descriptions of experiences, tone shifts, and situational context that may imply a 
       particular mood, even if no clear emotional terms are used. Ensure that both direct and 
       indirect indicators are considered to provide a comprehensive sentiment analysis.
      
      Return the result in the following JSON format only:
      {
        "mood": "one of [happy, sad, angry, stressed]",
        "score": "number between 0 and 1",
        "keywords": ["array", "of", "emotional", "keywords"]
      }
      
      Journal entry: "${text}"
    `;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1000
        }
      })
    });

    const data = await response.json();
    
    // Extract JSON from Gemini response
    const content = data.candidates[0].content.parts[0].text;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        mood: result.mood as Mood,
        score: Number(result.score),
        keywords: result.keywords
      };
    }
    
    // Fallback to simple analysis if AI parsing fails
    return fallbackAnalysis(text);
    
  } catch (error) {
    console.error("Error analyzing sentiment with Gemini:", error);
    // Fallback to local analysis in case of API error
    return fallbackAnalysis(text);
  }
}

// Fallback sentiment analysis for when the API fails
function fallbackAnalysis(text: string): SentimentResult {
  const normalizedText = text.toLowerCase();
  
  // Define keyword sets for different moods
  const moodKeywords = {
    happy: [
      "happy", "joyful", "elated", "ecstatic", "delighted", "cheerful", "blissful", "content",
      "satisfied", "thrilled", "jubilant", "exuberant", "euphoric", "overjoyed", "radiant", "merry",
      "sunny", "upbeat", "optimistic", "glad", "beaming", "gleeful", "buoyant", "lighthearted",
      "chipper", "gratified", "tickled", "in high spirits", "on cloud nine", "celebratory", "joyous",
      "blissed-out", "rejoicing", "in seventh heaven", "thrilled to bits", "smiling", "deliriously happy",
      "carefree", "enthusiastic", "sparkling", "peppy", "bubbly", "exhilarated"
    ],
    
    sad: [
      "sad", "sorrowful", "unhappy", "depressed", "miserable", "downcast", "gloomy", "melancholic",
      "dejected", "despairing", "despondent", "heartbroken", "tearful", "blue", "somber", "mournful",
      "grieving", "dismal", "woeful", "low", "pitiful", "lugubrious", "crestfallen", "anguished",
      "forlorn", "desolate", "lonesome", "sorrowing", "weeping", "grief-stricken", "troubled",
      "regretful", "remorseful", "heavy-hearted", "dispirited", "pensive", "down in the dumps",
      "in a funk", "heart-sore", "doleful", "blue", "crestfallen", "in mourning", "drained", "disconsolate"
    ],
  
    angry: [
      "angry", "mad", "furious", "enraged", "irate", "incensed", "livid", "infuriated", "outraged",
      "irritated", "annoyed", "cross", "exasperated", "heated", "agitated", "fuming", "seething",
      "resentful", "bitter", "hostile", "upset", "vexed", "choleric", "rageful", "explosive",
      "hot-tempered", "testy", "snappy", "provoked", "indignant", "storming", "wrathful", "boiling",
      "displeased", "pissed off", "flustered", "short-tempered", "irascible", "fiery", "combative",
      "miffed", "riled", "antagonistic"
    ],
  
    stressed: [
      "stressed", "anxious", "worried", "tense", "overwhelmed", "pressured", "uneasy", "nervous",
      "frantic", "agitated", "burned out", "on edge", "jittery", "disturbed", "restless",
      "apprehensive", "frazzled", "panicky", "flustered", "discomposed", "unsettled", "strung out",
      "overwrought", "harried", "taxed", "knotted", "disquieted", "rattled", "perturbed", "alarmed",
      "troubled", "hyper", "nervous wreck", "shaken", "mentally exhausted", "on a hair trigger",
      "stretched thin", "burning out", "under pressure", "tense as a bowstring", "at my wit’s end"
    ],
  
    neutral: [
      "neutral", "indifferent", "okay", "fine", "so-so", "average", "mediocre", "balanced",
      "unremarkable", "even", "calm", "composed", "steady", "equanimous", "placid", "measured",
      "moderate", "unflustered", "restrained", "bland", "impassive", "dispassionate",
      "matter-of-fact", "deadpan", "level-headed", "apathetic", "nonchalant", "casual", "detached",
      "ordinary", "typical", "standard", "unspecific", "quiet", "low-key", "unmoved", "even-tempered",
      "phlegmatic", "still", "uninvolved", "complacent", "undisturbed", "impartial", "stoic",
      "passive", "unemotional", "neutral-minded", "middling", "so-so", "on the fence"
    ]
  };
  
  
  // Count occurrences of mood keywords
  const moodCounts: Record<Mood, { count: number, words: string[] }> = {
    happy: { count: 0, words: [] },
    sad: { count: 0, words: [] },
    neutral: { count: 0, words: [] },
    angry: { count: 0, words: [] },
    stressed: { count: 0, words: [] }
  };
  
  // Simple word matching
  Object.entries(moodKeywords).forEach(([mood, keywords]) => {
    keywords.forEach(keyword => {
      if (normalizedText.includes(keyword)) {
        moodCounts[mood as Mood].count++;
        moodCounts[mood as Mood].words.push(keyword);
      }
    });
  });
  
  // Find dominant mood
  let dominantMood: Mood = 'neutral';
  let maxCount = 0;
  
  Object.entries(moodCounts).forEach(([mood, { count }]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantMood = mood as Mood;
    }
  });
  
  // Default to neutral if no keywords are found
  if (maxCount === 0) {
    return { mood: 'neutral', score: 0.5, keywords: [] };
  }
  
  // Calculate score (0 to 1) based on keyword density
  const totalWords = text.split(/\s+/).length;
  const score = Math.min(maxCount / (totalWords * 0.1), 1); // Cap at 1
  
  return {
    mood: dominantMood,
    score: score,
    keywords: moodCounts[dominantMood].words
  };
}

// Get color based on mood
export function getMoodColor(mood: Mood): string {
  switch (mood) {
    case 'happy':
      return 'bg-mood-happy';
    case 'sad':
      return 'bg-mood-sad';
    case 'angry':
      return 'bg-mood-angry';
    case 'stressed':
      return 'bg-mood-stressed';
    case 'neutral':
    default:
      return 'bg-mood-neutral';
  }
}

// Get emoji based on mood
export function getMoodEmoji(mood: Mood): string {
  switch (mood) {
    case 'happy':
      return '😊';
    case 'sad':
      return '😔';
    case 'angry':
      return '😠';
    case 'stressed':
      return '😰';
    case 'neutral':
    default:
      return '😐';
  }
}

// Get description based on mood
export function getMoodDescription(mood: Mood): string {
  switch (mood) {
    case 'happy':
      return 'Joyful and content';
    case 'sad':
      return 'Feeling down';
    case 'angry':
      return 'Frustrated or annoyed';
    case 'stressed':
      return 'Overwhelmed or anxious';
    case 'neutral':
    default:
      return 'Balanced and calm';
  }
}
