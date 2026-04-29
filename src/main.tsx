import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';

// Suppress ResizeObserver loop errors
const resizeObserverErrors = [
  'ResizeObserver loop completed with undelivered notifications.',
  'ResizeObserver loop limit exceeded',
  'ResizeObserver loop'
];

const handleResizeObserverError = (e: any) => {
  const message = e?.message || (typeof e === 'string' ? e : '');
  if (resizeObserverErrors.some(err => message.includes(err))) {
    e?.stopImmediatePropagation?.();
    e?.preventDefault?.();
    return true;
  }
  return false;
};

window.addEventListener('error', (e) => {
  if (handleResizeObserverError(e)) return;
});

window.addEventListener('unhandledrejection', (e) => {
  if (handleResizeObserverError(e.reason)) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

// Also suppress from console.error
const originalError = console.error;
console.error = (...args) => {
  if (args.length > 0 && typeof args[0] === 'string' && resizeObserverErrors.some(err => args[0].includes(err))) {
    return;
  }
  originalError.apply(console, args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
