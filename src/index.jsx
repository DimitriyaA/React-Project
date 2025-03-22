import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import 'animate.css';

import { BrowserRouter } from 'react-router-dom';  // Импортиране на BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>  {/* Тук обвиваме целия App с BrowserRouter */}
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
