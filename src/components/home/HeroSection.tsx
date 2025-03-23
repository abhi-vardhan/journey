
import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { SvgIcon } from '@progress/kendo-react-common';
import { bookIcon, chartAreaClusteredIcon } from '@progress/kendo-svg-icons';
import { Fade } from '@progress/kendo-react-animation';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Card, CardTitle, CardBody } from '@progress/kendo-react-layout';

const HeroSection: React.FC = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none serif">
                Discover Your Inner <span className="text-gradient">Balance</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Journal your thoughts and emotions while our AI provides personalized
                insights and motivation to help you grow.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                onClick={() => window.location.href = '/journal'}
              >
                <SvgIcon icon={bookIcon} className="k-icon k-button-icon" />
                <span className="k-button-text">Start Journaling</span>
              </Button>
              <Button
                className="k-button k-button-md k-rounded-md k-button-outline k-button-outline-info"
                onClick={() => window.location.href = '/analytics'}
              >
                <SvgIcon icon={chartAreaClusteredIcon} className="k-icon k-button-icon" />
                <span className="k-button-text">View Analytics</span>
              </Button>
            </div>
            
            <Fade>
              <NotificationGroup style={{ position: 'relative', marginTop: '1rem' }}>
                <Notification
                  type={{ style: 'success', icon: true }}
                  closable={false}
                >
                  <span>Join thousands of people who have discovered their emotional patterns!</span>
                </Notification>
              </NotificationGroup>
            </Fade>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <Card className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-1">
              <CardBody>
                <div className="relative h-full w-full rounded-lg p-6 bg-white bg-opacity-80 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-2 bg-primary rounded-full"></div>
                    <blockquote className="text-xl font-serif italic">
                      "Your journal is a mirror that captures a moment in time, reflecting your true self."
                    </blockquote>
                  </div>
                  <div className="mt-auto pt-6 border-t border-gray-200">
                    <CardTitle>Today's Reflection</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      What emotions are guiding you today?
                    </p>
                    <div className="mt-4">
                      <DatePicker placeholder="Choose a date to journal" />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
