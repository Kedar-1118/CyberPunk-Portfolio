/**
 * SAFETY GUARD: Prevent browser permission prompts for "Access other apps and services" (Window Management/MIDI)
 * These mocks are placed here to proactively block hidden triggers in dependencies or environment scripts.
 */
if (typeof window !== 'undefined') {
  // Proactively mock Window Management API
  if (!window.getScreenDetails) {
    window.getScreenDetails = async () => {
      console.warn('Safety Guard: blocked getScreenDetails to prevent permission prompt.');
      throw new Error('Permission denied by Safety Guard');
    };
  }

  // Proactively mock Web MIDI API
  if (navigator && !navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess = async () => {
      console.warn('Safety Guard: blocked requestMIDIAccess to prevent permission prompt.');
      throw new Error('Permission denied by Safety Guard');
    };
  }
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
