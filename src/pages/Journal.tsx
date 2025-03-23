
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import JournalEntry from '../components/JournalEntry';
import JournalList from '../components/JournalList';
import { useToast } from "@/components/ui/use-toast";

interface JournalEntryType {
  id: string;
  date: Date;
  content: string;
  mood: string;
  moodScore: number;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryType | null>(null);
  const [showEntryForm, setShowEntryForm] = useState(true);
  const { toast } = useToast();
  
  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);
  
  // Save entries to localStorage when updated
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('journalEntries', JSON.stringify(entries));
    }
  }, [entries]);
  
  const handleSaveEntry = (entry: JournalEntryType) => {
    const updatedEntries = [...entries, entry];
    setEntries(updatedEntries);
    setShowEntryForm(false);
    
    toast({
      title: "Journal entry saved",
      description: "Your reflection has been saved successfully.",
    });
  };
  
  const handleEntryClick = (entry: JournalEntryType) => {
    setSelectedEntry(entry);
    setShowEntryForm(false);
  };
  
  const handleNewEntry = () => {
    setSelectedEntry(null);
    setShowEntryForm(true);
  };
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight serif">Journal</h1>
          
          {!showEntryForm && (
            <button
              onClick={handleNewEntry}
              className="btn-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              New Entry
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {showEntryForm ? (
              <JournalEntry onSave={handleSaveEntry} />
            ) : selectedEntry ? (
              <div className="paper p-6 rounded-xl animate-scale-in">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Entry from {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedEntry.date).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm bg-secondary capitalize">
                    {selectedEntry.mood}
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{selectedEntry.content}</p>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    className="btn-secondary"
                    onClick={() => setSelectedEntry(null)}
                  >
                    Back to List
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 text-center p-12 border border-dashed rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">Select a journal entry</h3>
                  <p className="text-muted-foreground">
                    Choose an entry from the list or create a new one
                  </p>
                </div>
                <button
                  onClick={handleNewEntry}
                  className="btn-primary"
                >
                  Create New Entry
                </button>
              </div>
            )}
          </div>
          
          <div className="md:col-span-1">
            <JournalList entries={entries} onEntryClick={handleEntryClick} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Journal;
