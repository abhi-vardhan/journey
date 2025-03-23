
import React, { useState } from 'react';

interface MotivationalQuoteProps {
  quote: {
    text: string;
    author: string;
  };
  tips: string[];
  exercises: string[];
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ quote, tips, exercises }) => {
  const [activeTab, setActiveTab] = useState<'quote' | 'tips' | 'exercises'>('quote');
  
  return (
    <div className="glass p-6 rounded-xl border border-accent/20 shadow-subtle">
      <div className="flex space-x-4 mb-6">
        <button
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'quote' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('quote')}
        >
          Quote
        </button>
        <button
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'tips' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('tips')}
        >
          Tips
        </button>
        <button
          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'exercises' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('exercises')}
        >
          Exercises
        </button>
      </div>
      
      <div className="min-h-[180px]">
        {activeTab === 'quote' && (
          <div className="animate-fade-in">
            <blockquote className="text-xl italic font-serif mb-3">
              "{quote.text}"
            </blockquote>
            <cite className="text-sm text-muted-foreground">— {quote.author}</cite>
          </div>
        )}
        
        {activeTab === 'tips' && (
          <div className="animate-fade-in">
            <h4 className="text-lg font-medium mb-4">Tips for Today</h4>
            <ul className="space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {activeTab === 'exercises' && (
          <div className="animate-fade-in">
            <h4 className="text-lg font-medium mb-4">Suggested Exercises</h4>
            <ul className="space-y-3">
              {exercises.map((exercise, index) => (
                <li key={index} className="bg-secondary/50 p-3 rounded-lg">
                  {exercise}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MotivationalQuote;
