import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { DEFAULT_THEME, setTheme } from './modules/theme.ts';

setTheme(DEFAULT_THEME);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
