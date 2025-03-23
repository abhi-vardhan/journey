
import { quotes, defaultQuotes } from "../data/quotes";

type Mood = 'happy' | 'sad' | 'neutral' | 'angry' | 'stressed';

interface Quote {
  text: string;
  author: string;
}

export function getQuoteForMood(mood: Mood): Quote {
  // Filter quotes by the detected mood
  const moodQuotes = quotes.filter(quote => quote.mood === mood);
  
  // If we have quotes for this mood, return a random one
  if (moodQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * moodQuotes.length);
    return {
      text: moodQuotes[randomIndex].text,
      author: moodQuotes[randomIndex].author
    };
  }
  
  // If no quotes for this mood, return a default quote
  const randomDefault = Math.floor(Math.random() * defaultQuotes.length);
  return {
    text: defaultQuotes[randomDefault].text,
    author: defaultQuotes[randomDefault].author
  };
}

// Generate tips based on mood
export function getTipsForMood(mood: Mood): string[] {
  switch (mood) {
    case 'happy':
      return [
        "Share your happiness with someone else today",
        "Write down what made you happy to revisit later",
        "Use this positive energy for a creative project",
        "Take a photo to remember this good moment",
        "Express gratitude for the positive things in your life"
      ];
    case 'sad':
      return [
        "Try gentle physical activity like walking or stretching",
        "Connect with a friend or loved one",
        "Practice self-compassion - treat yourself with kindness",
        "Listen to uplifting music or watch a comedy",
        "Spend time in nature if possible"
      ];
    case 'angry':
      return [
        "Take slow, deep breaths for a few minutes",
        "Write out your feelings without censoring yourself",
        "Remove yourself from triggering situations if possible",
        "Try physical exercise to release tension",
        "Consider if there's a constructive way to address what made you angry"
      ];
    case 'stressed':
      return [
        "Practice a 5-minute mindfulness meditation",
        "Break down large tasks into smaller, manageable steps",
        "Set boundaries and learn to say no when necessary",
        "Prioritize adequate sleep and nutrition",
        "Try the 4-7-8 breathing technique (inhale 4, hold 7, exhale 8)"
      ];
    case 'neutral':
    default:
      return [
        "Set an intention for how you want to feel today",
        "Try something new to spark curiosity and engagement",
        "Reflect on your goals and values",
        "Practice mindfulness to become more aware of your emotions",
        "Connect with nature or take a short walk outside"
      ];
  }
}

// Generate exercises based on mood
export function getExercisesForMood(mood: Mood): string[] {
  switch (mood) {
    case 'happy':
      return [
        "Gratitude list: Write down 5 things you're grateful for",
        "Pay it forward: Do something kind for someone else",
        "Joy jar: Add a note about today's happiness to a collection",
        "Savor the moment: Fully engage with something you enjoy",
        "Celebrate: Share your good feelings with someone else"
      ];
    case 'sad':
      return [
        "Self-compassion letter: Write to yourself with kindness",
        "Sensory grounding: Find 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste",
        "Mood-boosting playlist: Create and listen to uplifting music",
        "Reach out: Text or call someone who makes you feel good",
        "Small joy: Do one tiny thing that normally brings you pleasure"
      ];
    case 'angry':
      return [
        "Release writing: Write out your anger, then safely destroy it",
        "Physical release: Punch a pillow or do jumping jacks",
        "Cooling visualization: Imagine anger as hot energy leaving your body",
        "Opposite action: Do something that creates the opposite feeling",
        "Perspective shift: Write the situation from another point of view"
      ];
    case 'stressed':
      return [
        "Progressive muscle relaxation: Tense and release each muscle group",
        "To-done list: Write down what you've accomplished today, no matter how small",
        "5-minute decluttering: Clear a small space in your environment",
        "Worry time: Schedule 10 minutes to worry freely, then put worries aside",
        "Sensory comfort: Find something pleasing to touch, look at, smell, taste, or hear"
      ];
    case 'neutral':
    default:
      return [
        "Values reflection: Write about one core value and how you can honor it today",
        "Future self: Write a letter from your future self to your current self",
        "Strength spotting: Note three personal strengths you've used recently",
        "Mindful walking: Take a short walk with full attention to your senses",
        "Creative expression: Doodle, sing, or move your body freely for 5 minutes"
      ];
  }
}
