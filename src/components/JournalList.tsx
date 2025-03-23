
import React from 'react';
import { getMoodColor, getMoodEmoji } from '../utils/sentimentAnalysis';

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  mood: string;
  moodScore: number;
}

interface JournalListProps {
  entries: JournalEntry[];
  onEntryClick: (entry: JournalEntry) => void;
}

const JournalList: React.FC<JournalListProps> = ({ entries, onEntryClick }) => {
  // Group entries by month
  const groupedEntries: Record<string, JournalEntry[]> = {};
  
  entries.forEach(entry => {
    const date = new Date(entry.date);
    const month = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!groupedEntries[month]) {
      groupedEntries[month] = [];
    }
    
    groupedEntries[month].push(entry);
  });
  
  if (entries.length === 0) {
    return (
      <div className="glass p-6 rounded-xl border border-accent/20 shadow-subtle text-center">
        <h3 className="text-lg font-semibold mb-2">Journal Entries</h3>
        <p className="text-muted-foreground">You haven't written any journal entries yet.</p>
      </div>
    );
  }
  
  return (
    <div className="glass p-6 rounded-xl border border-accent/20 shadow-subtle">
      <h3 className="text-lg font-semibold mb-6">Journal Entries</h3>
      
      <div className="space-y-8">
        {Object.entries(groupedEntries).map(([month, monthEntries]) => (
          <div key={month}>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">{month}</h4>
            
            <div className="space-y-3">
              {monthEntries.map(entry => {
                const date = new Date(entry.date);
                const formattedDate = date.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric'
                });
                const formattedTime = date.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                });
                
                // Truncate content for preview
                const preview = entry.content.length > 120 
                  ? `${entry.content.substring(0, 120)}...` 
                  : entry.content;
                
                const moodColor = getMoodColor(entry.mood as any);
                const moodEmoji = getMoodEmoji(entry.mood as any);
                
                return (
                  <div 
                    key={entry.id}
                    className="p-4 rounded-lg bg-white hover:bg-secondary/10 border border-border cursor-pointer transition-colors card-hover"
                    onClick={() => onEntryClick(entry)}
                  >
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${moodColor}`}>
                        {moodEmoji}
                      </div>
                      
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium">{formattedDate}</div>
                          <div className="text-xs text-muted-foreground">{formattedTime}</div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">{preview}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalList;
