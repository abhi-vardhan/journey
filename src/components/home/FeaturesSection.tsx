
import React, { useState } from 'react';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Card, CardTitle, CardBody, CardActions } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';

const FeaturesSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const features = [
    { id: 1, title: 'Emotional Intelligence', description: 'Discover patterns in your emotions and learn how to manage them effectively.' },
    { id: 2, title: 'Personal Growth', description: 'Track your journey and visualize your progress over time.' },
    { id: 3, title: 'Daily Motivation', description: 'Receive personalized quotes and exercises tailored to your emotional state.' }
  ];

  const journalingTips = [
    { id: 1, title: 'Morning Pages', description: 'Write three pages of stream of consciousness writing first thing in the morning.' },
    { id: 2, title: 'Gratitude Journal', description: 'List three things you\'re grateful for each day.' },
    { id: 3, title: 'Reflection Time', description: 'Set aside 15 minutes each evening to reflect on your day.' }
  ];

  const handleTabSelect = (e: any) => {
    setSelectedTab(e.selected);
  };

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Featured Insights
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl serif">
              Explore What's Possible
            </h2>
          </div>
        </div>
        
        <div className="mt-8">
          <TabStrip selected={selectedTab} onSelect={handleTabSelect} className="mb-8">
            <TabStripTab title="Features">
              <div className="grid md:grid-cols-3 gap-6 py-8">
                {features.map(feature => (
                  <Card key={feature.id} className="card-hover">
                    <CardBody>
                      <CardTitle>{feature.title}</CardTitle>
                      <p className="mt-2 text-muted-foreground">{feature.description}</p>
                    </CardBody>
                    <CardActions>
                      <Button className="k-button k-button-md k-button-flat k-button-flat-primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </TabStripTab>
            <TabStripTab title="Journaling Tips">
              <div className="grid md:grid-cols-3 gap-6 py-8">
                {journalingTips.map(tip => (
                  <Card key={tip.id} className="card-hover">
                    <CardBody>
                      <CardTitle>{tip.title}</CardTitle>
                      <p className="mt-2 text-muted-foreground">{tip.description}</p>
                    </CardBody>
                    <CardActions>
                      <Button className="k-button k-button-md k-button-flat k-button-flat-primary">
                        Try This
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </TabStripTab>
          </TabStrip>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
