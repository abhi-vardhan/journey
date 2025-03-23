
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl animate-fade-in">
        {children}
      </main>
      
      <footer className="mt-auto py-6 bg-background border-t">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Reflections Journal - AI-Powered Daily Motivation
              </p>
            </div>
            
            <nav className="flex space-x-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/journal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Journal
              </Link>
              <Link to="/analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
