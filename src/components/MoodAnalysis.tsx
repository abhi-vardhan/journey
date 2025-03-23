
import React from 'react';
import { getMoodColor, getMoodEmoji, getMoodDescription } from '../utils/sentimentAnalysis';

interface MoodAnalysisProps {
  mood: 'happy' | 'sad' | 'neutral' | 'angry' | 'stressed';
  score: number;
  keywords: string[];
}

const MoodAnalysis: React.FC<MoodAnalysisProps> = ({ mood, score, keywords }) => {
  const moodColor = getMoodColor(mood);
  const moodEmoji = getMoodEmoji(mood);
  const moodDescription = getMoodDescription(mood);
  
  // Format score as percentage
  const formattedScore = `${Math.round(score * 100)}%`;
  
  return (
    <div className="glass p-6 rounded-xl border border-accent/20 shadow-subtle">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Mood Analysis</h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <div className={`text-4xl mr-4`}>{moodEmoji}</div>
            <div>
              <h4 className="text-lg font-semibold capitalize">{mood}</h4>
              <p className="text-sm text-muted-foreground">{moodDescription}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Confidence</span>
              <span className="text-sm font-medium">{formattedScore}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${moodColor}`} 
                style={{ width: formattedScore }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="text-sm font-medium mb-2">Detected Keywords</h4>
          {keywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span 
                  key={index} 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${moodColor.replace('bg-', 'bg-opacity-20 text-')}`}
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No specific mood keywords detected. Analysis based on overall tone.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodAnalysis;
