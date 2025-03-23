
import React from 'react';
import { Window } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';

interface WelcomeDialogProps {
  showPromo: boolean;
  onClose: () => void;
}

const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ showPromo, onClose }) => {
  if (!showPromo) return null;
  
  return (
    <Window title="Welcome to Reflect!" onClose={onClose} initialWidth={400}>
      <div className="p-4">
        <p className="mb-4">Thanks for subscribing! You'll receive journaling prompts to help you get started.</p>
        <Button className="k-button k-button-md k-button-solid k-button-solid-primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Window>
  );
};

export default WelcomeDialog;
