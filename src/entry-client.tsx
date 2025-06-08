import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Hydrate the server-rendered HTML
hydrateRoot(document.getElementById('root')!, <App />);