import React from 'react';
import Modal from 'react-modal';

// Define the type for the props (if your modal needs any).
interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Set the app element to support accessibility (for screen readers).
Modal.setAppElement('#root');