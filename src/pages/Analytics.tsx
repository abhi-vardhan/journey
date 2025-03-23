
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MoodTrends from '../components/MoodTrends';
import { getMoodEmoji } from '../utils/sentimentAnalysis';

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  mood: string;
  moodScore: number;
}

const Analytics = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year' | 'all'>('all');
  
  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);
  
  // Filter entries based on time range
  const filteredEntries = (() => {
    if (timeRange === 'all') return entries;
    
    const now = new Date();
    const cutoffDate = new Date();
    
    if (timeRange === 'week') {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (timeRange === 'month') {
      cutoffDate.setMonth(now.getMonth() - 1);
    } else if (timeRange === 'year') {
      cutoffDate.setFullYear(now.getFullYear() - 1);
    }
    
    return entries.filter(entry => new Date(entry.date) >= cutoffDate);
  })();
  
  // Calculate mood counts
  const moodCounts: Record<string, number> = {};
  entries.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });
  
  // Calculate streaks
  const calculateStreak = () => {
    if (entries.length === 0) return 0;
    
    // Sort entries by date (newest first)
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let currentStreak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const mostRecentDate = new Date(sortedEntries[0].date);
    mostRecentDate.setHours(0, 0, 0, 0);
    
    // Check if most recent entry was today or yesterday
    const timeDiff = today.getTime() - mostRecentDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    
    if (daysDiff > 1) {
      // Streak broken
      return 0;
    }
    
    // Calculate consecutive days
    for (let i = 0; i < sortedEntries.length - 1; i++) {
      const currentDate = new Date(sortedEntries[i].date);
      const nextDate = new Date(sortedEntries[i + 1].date);
      
      currentDate.setHours(0, 0, 0, 0);
      nextDate.setHours(0, 0, 0, 0);
      
      const diff = (currentDate.getTime() - nextDate.getTime()) / (1000 * 3600 * 24);
      
      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    return currentStreak;
  };
  
  const streak = calculateStreak();
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight serif">Analytics</h1>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === 'week' 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === 'month' 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === 'year' 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              Year
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              All Time
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass p-6 rounded-xl border border-accent/20 shadow-subtle">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Entries</h3>
            <p className="text-3xl font-bold">{filteredEntries.length}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {timeRange === 'all' 
                ? 'All time' 
                : `Past ${timeRange === 'week' ? '7 days' : timeRange === 'month' ? 'month' : 'year'}`
              }
            </p>
          </div>
          
          <div className="glass p-6 rounded-xl border border-accent/20 shadow-subtle">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Streak</h3>
            <p className="text-3xl font-bold">{streak} {streak === 1 ? 'day' : 'days'}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {streak > 0 
                ? 'Keep the momentum going!' 
                : 'Start a new streak today'
              }
            </p>
          </div>
          
          <div className="glass p-6 rounded-xl border border-accent/20 shadow-subtle">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Dominant Mood</h3>
            {entries.length > 0 ? (
              <>
                <div className="flex items-center">
                  <p className="text-3xl font-bold capitalize">
                    {Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'}
                  </p>
                  <span className="text-2xl ml-2">
                    {getMoodEmoji(Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as any || 'neutral')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your journal entries
                </p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold">-</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start journaling to see insights
                </p>
              </>
            )}
          </div>
        </div>
        
        <MoodTrends entries={filteredEntries} />
        
        {entries.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              You haven't written any journal entries yet. Start journaling to see your analytics.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;
