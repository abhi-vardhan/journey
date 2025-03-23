
import React from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

const HowItWorksSection: React.FC = () => {
  const data = [
    { id: 1, icon: 'note', step: 'Journal', description: 'Write your thoughts and feelings each day' },
    { id: 2, icon: 'chart', step: 'Analysis', description: 'AI analyzes your emotions and patterns' },
    { id: 3, icon: 'heart', step: 'Insights', description: 'Receive personalized recommendations' },
    { id: 4, icon: 'calendar', step: 'Growth', description: 'Track your emotional growth over time' }
  ];

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl serif">
              Your Journey to Self-Discovery
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-powered journal analyzes your emotions and provides personalized insights to help you grow.
            </p>
          </div>
        </div>
        
        <div className="mx-auto max-w-5xl py-12">
          <Grid
            data={data}
            style={{ height: '400px' }}
          >
            <GridColumn field="step" title="Step" width="150px" />
            <GridColumn field="description" title="Description" />
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
