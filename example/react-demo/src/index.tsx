import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Update the import path
import { init } from 'sdk';
import { BrowserRouter as Router } from 'react-router-dom';

// Initialize SDK configuration
init({
    appId: 'app001', // Replace with the actual appId
    userId: 'user001', // Replace with the actual userId
    reportUrl: 'http://localhost:3000/tracking', // Replace with the actual backend reporting address
    autoTracker: true, // Enable automatic event tracking
    delay: 0, // Delay and merge reporting time in milliseconds
    hashPage: false, // Set according to whether it is a hash route
    errorReport: true, // Enable error monitoring
    blankReport: true, // Enable blank page monitoring
    pvReport: true, // Enable PV monitoring
    uvReport: true, // Enable UV monitoring
    webVitalsReport:true
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <App />
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();