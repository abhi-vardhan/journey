
interface Quote {
  text: string;
  author: string;
  mood: 'happy' | 'sad' | 'neutral' | 'angry' | 'stressed' | 'any';
}

export const quotes: Quote[] = [
  {
    text: "Life isn't about waiting for the storm to pass, it's about learning to dance in the rain.",
    author: "Vivian Greene",
    mood: "sad"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    mood: "neutral"
  },
  {
    text: "Happiness is not something ready-made. It comes from your own actions.",
    author: "Dalai Lama",
    mood: "sad"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
    mood: "neutral"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    mood: "neutral"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    mood: "stressed"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    mood: "stressed"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    mood: "neutral"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    mood: "sad"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    mood: "stressed"
  },
  {
    text: "Happiness is not by chance, but by choice.",
    author: "Jim Rohn",
    mood: "sad"
  },
  {
    text: "Keep your face always toward the sunshine—and shadows will fall behind you.",
    author: "Walt Whitman",
    mood: "sad"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    mood: "sad"
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    author: "Charles R. Swindoll",
    mood: "stressed"
  },
  {
    text: "I am not a product of my circumstances. I am a product of my decisions.",
    author: "Stephen Covey",
    mood: "neutral"
  },
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
    mood: "stressed"
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
    mood: "stressed"
  },
  {
    text: "Happiness is letting go of what you think your life is supposed to look like and celebrating it for everything that it is.",
    author: "Mandy Hale",
    mood: "happy"
  },
  {
    text: "The most important thing is to enjoy your life—to be happy—it's all that matters.",
    author: "Audrey Hepburn",
    mood: "happy"
  },
  {
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    author: "Thich Nhat Hanh",
    mood: "happy"
  },
  {
    text: "Count your age by friends, not years. Count your life by smiles, not tears.",
    author: "John Lennon",
    mood: "happy"
  },
  {
    text: "Happiness is a warm puppy.",
    author: "Charles M. Schulz",
    mood: "happy"
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    mood: "happy"
  },
  {
    text: "It's not how much we have, but how much we enjoy, that makes happiness.",
    author: "Charles Spurgeon",
    mood: "happy"
  },
  {
    text: "For every minute you are angry you lose sixty seconds of happiness.",
    author: "Ralph Waldo Emerson",
    mood: "angry"
  },
  {
    text: "When angry, count to four; when very angry, swear.",
    author: "Mark Twain",
    mood: "angry"
  },
  {
    text: "Speak when you are angry and you will make the best speech you will ever regret.",
    author: "Ambrose Bierce",
    mood: "angry"
  },
  {
    text: "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.",
    author: "Mark Twain",
    mood: "angry"
  },
  {
    text: "In times of great stress or adversity, it's always best to keep busy, to plow your anger and your energy into something positive.",
    author: "Lee Iacocca",
    mood: "angry"
  }
];

// Default quotes for when no specific mood match is found
export const defaultQuotes: Quote[] = [
  {
    text: "Every day may not be good, but there is something good in every day.",
    author: "Unknown",
    mood: "any"
  },
  {
    text: "You are enough just as you are.",
    author: "Unknown",
    mood: "any"
  },
  {
    text: "One small positive thought in the morning can change your whole day.",
    author: "Unknown",
    mood: "any"
  },
  {
    text: "Make today so awesome that yesterday gets jealous.",
    author: "Unknown",
    mood: "any"
  },
  {
    text: "Your attitude determines your direction.",
    author: "Ralph Waldo Emerson",
    mood: "any"
  }
];
