
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient serif">Reflections</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActiveRoute('/') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/journal" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActiveRoute('/journal') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Journal
            </Link>
            <Link 
              to="/analytics" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActiveRoute('/analytics') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Analytics
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-secondary focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4 px-2 pb-3 pt-2">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActiveRoute('/') ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/journal" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActiveRoute('/journal') ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Journal
              </Link>
              <Link 
                to="/analytics" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActiveRoute('/analytics') ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Analytics
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
