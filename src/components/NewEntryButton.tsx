
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import { SvgIcon } from '@progress/kendo-react-common';
import { plusIcon } from '@progress/kendo-svg-icons';

interface NewEntryButtonProps {
  mode?: 'fab' | 'button';
}

const NewEntryButton: React.FC<NewEntryButtonProps> = ({ mode = 'fab' }) => {
  if (mode === 'fab') {
    return (
      <Link 
        to="/journal" 
        className="fixed bottom-6 right-6 z-10 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-elevated hover:bg-primary/90 transition-colors"
        aria-label="New Journal Entry"
      >
        <SvgIcon icon={plusIcon} size="large" />
      </Link>
    );
  }
  
  return (
    <Button
      className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
      onClick={() => window.location.href = '/journal'}
    >
      <SvgIcon icon={plusIcon} className="k-icon k-i-plus k-button-icon" />
      <span className="k-button-text">New Journal Entry</span>
    </Button>
  );
};

export default NewEntryButton;
