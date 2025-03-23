
import React, { useState } from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import CommunitySection from '../components/home/CommunitySection';
import CtaSection from '../components/home/CtaSection';
import WelcomeDialog from '../components/home/WelcomeDialog';

const Index = () => {
  const [showPromo, setShowPromo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/journal';
    }, 1000);
  };

  const handleSubscribe = () => {
    setShowPromo(true);
  };

  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      
      <section className="py-12 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <CommunitySection onSubscribe={handleSubscribe} />
        </div>
      </section>
      
      <CtaSection loading={loading} onGetStarted={handleGetStarted} />
      <WelcomeDialog showPromo={showPromo} onClose={() => setShowPromo(false)} />
    </Layout>
  );
};

export default Index;
