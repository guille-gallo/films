import { createRoot } from 'react-dom/client';
import { App } from './App';
import { APP_CONFIG, ERROR_MESSAGES } from '@/constants';

const container = document.getElementById(APP_CONFIG.DOM.ROOT_ID);
if (!container) {
  throw new Error(ERROR_MESSAGES.ROOT_ELEMENT_NOT_FOUND);
}

const root = createRoot(container);
root.render(<App />);
