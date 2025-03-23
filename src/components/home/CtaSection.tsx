
import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { SvgIcon } from '@progress/kendo-react-common';
import { plusIcon } from '@progress/kendo-svg-icons';
import { Loader } from '@progress/kendo-react-indicators';

interface CtaSectionProps {
  loading: boolean;
  onGetStarted: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ loading, onGetStarted }) => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-white to-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl serif">
              Ready to Start Your Journey?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Begin journaling today and discover insights about yourself
            </p>
          </div>
        </div>
        
        <div className="mx-auto w-full max-w-sm space-y-2 mt-12 text-center">
          <Button
            className="k-button k-button-lg k-rounded-md k-button-solid k-button-solid-primary"
            onClick={onGetStarted}
          >
            {loading ? (
              <Loader size="small" type="infinite-spinner" />
            ) : (
              <>
                <SvgIcon icon={plusIcon} className="k-icon k-button-icon" />
                <span className="k-button-text">Get Started</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
