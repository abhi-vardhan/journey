
import React, { useState } from 'react';
import { analyzeSentiment } from '../utils/sentimentAnalysis';
import { getQuoteForMood, getTipsForMood, getExercisesForMood } from '../utils/quoteGenerator';
import MoodAnalysis from './MoodAnalysis';
import MotivationalQuote from './MotivationalQuote';
import { Loader } from '@progress/kendo-react-indicators';

interface JournalEntryProps {
  onSave: (entry: {
    id: string;
    date: Date;
    content: string;
    mood: string;
    moodScore: number;
  }) => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ onSave }) => {
  const [content, setContent] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleAnalyze = async () => {
    if (content.trim().length < 10) {
      return;
    }
    
    setAnalyzing(true);
    setError(null);
    
    try {
      // Use Gemini AI for sentiment analysis
      const result = await analyzeSentiment(content);
      const quote = getQuoteForMood(result.mood);
      const tips = getTipsForMood(result.mood);
      const exercises = getExercisesForMood(result.mood);
      
      setAnalysis({
        ...result,
        quote,
        tips,
        exercises
      });
    } catch (err) {
      console.error("Error analyzing mood:", err);
      setError("Something went wrong while analyzing your mood. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };
  
  const handleSave = () => {
    if (!analysis) return;
    
    const journalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      content,
      mood: analysis.mood,
      moodScore: analysis.score
    };
    
    onSave(journalEntry);
    setContent('');
    setAnalysis(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="paper p-6 rounded-xl animate-scale-in">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Today's Reflection</h2>
        
        <textarea
          className="w-full p-4 min-h-[200px] bg-transparent border-0 focus:ring-0 resize-none font-serif text-lg text-journal-ink placeholder:text-gray-400"
          placeholder="How are you feeling today? Share your thoughts, emotions, or experiences..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        
        <div className="flex justify-end mt-4">
          <button
            className={`btn-primary flex items-center ${analyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleAnalyze}
            disabled={analyzing || content.trim().length < 10}
          >
            {analyzing ? (
              <>
                <Loader size="small" type="infinite-spinner" />
                <span className="ml-2">Analyzing with AI...</span>
              </>
            ) : (
              <>Analyze Mood</>
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-md">
            {error}
          </div>
        )}
      </div>
      
      {analysis && (
        <div className="space-y-6 animate-fade-in">
          <MoodAnalysis 
            mood={analysis.mood} 
            score={analysis.score} 
            keywords={analysis.keywords} 
          />
          
          <MotivationalQuote 
            quote={analysis.quote} 
            tips={analysis.tips} 
            exercises={analysis.exercises} 
          />
          
          <div className="flex justify-end">
            <button
              className="btn-primary"
              onClick={handleSave}
            >
              Save Journal Entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalEntry;
