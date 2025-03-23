
import React from 'react';
import { getMoodColor } from '../utils/sentimentAnalysis';

interface MoodEntry {
  id: string;
  date: Date;
  mood: string;
  moodScore: number;
}

interface MoodTrendsProps {
  entries: MoodEntry[];
}

const MoodTrends: React.FC<MoodTrendsProps> = ({ entries }) => {
  // Only show up to the last 7 entries for the chart
  const recentEntries = entries.slice(-7);
  
  // Get mood counts for pie chart
  const moodCounts: Record<string, number> = {};
  entries.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });
  
  // Calculate percentages
  const total = entries.length;
  const moodPercentages = Object.entries(moodCounts).map(([mood, count]) => ({
    mood,
    percentage: Math.round((count / total) * 100)
  }));
  
  // Get the most frequent mood
  let mostFrequentMood = { mood: 'neutral', count: 0 };
  Object.entries(moodCounts).forEach(([mood, count]) => {
    if (count > mostFrequentMood.count) {
      mostFrequentMood = { mood, count };
    }
  });
  
  if (entries.length === 0) {
    return (
      <div className="glass p-6 rounded-xl border border-accent/20 shadow-subtle text-center">
        <h3 className="text-lg font-semibold mb-2">Mood Trends</h3>
        <p className="text-muted-foreground">Start journaling to see your mood trends over time.</p>
      </div>
    );
  }
  
  return (
    <div className="glass p-6 rounded-xl border border-accent/20 shadow-subtle">
      <h3 className="text-lg font-semibold mb-6">Mood Trends</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mood Timeline */}
        <div>
          <h4 className="text-sm font-medium mb-4">Recent Moods</h4>
          
          <div className="flex items-end h-[180px] space-x-2">
            {recentEntries.map(entry => {
              const moodColor = getMoodColor(entry.mood as any);
              const height = `${Math.max(30, entry.moodScore * 100)}%`;
              const date = new Date(entry.date);
              const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              
              return (
                <div key={entry.id} className="flex flex-col items-center flex-1">
                  <div className="relative w-full flex-1 flex items-end">
                    <div 
                      className={`w-full rounded-t-md ${moodColor}`} 
                      style={{ height }}
                    ></div>
                  </div>
                  <div className="text-xs mt-2 w-full text-center truncate">
                    {formattedDate}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Mood Distribution */}
        <div>
          <h4 className="text-sm font-medium mb-4">Mood Distribution</h4>
          
          <div className="flex flex-col space-y-3">
            {moodPercentages.map(({ mood, percentage }) => (
              <div key={mood} className="flex items-center">
                <div className="w-24 capitalize text-sm">{mood}</div>
                <div className="flex-1">
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${getMoodColor(mood as any)}`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-right text-sm">{percentage}%</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <p className="text-sm">
              <span className="font-medium">Most frequent mood:</span>{' '}
              <span className="capitalize">{mostFrequentMood.mood}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Based on {entries.length} journal entries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTrends;
