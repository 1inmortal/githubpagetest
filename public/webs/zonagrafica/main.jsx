import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './App.css';

// Inicializar la aplicación React
const container = document.getElementById('root');
const root = createRoot(container);
root.render(React.createElement(App));
