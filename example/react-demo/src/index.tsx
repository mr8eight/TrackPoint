import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { init } from 'sdk';
import { BrowserRouter as Router } from 'react-router-dom';

//注册埋点
init({
    appId: 'app001', 
    userId: 'user001', 
    reportUrl: 'http://localhost:3000/tracking', 
    autoTracker: true, 
    delay: 0, 
    hashPage: false, 
    errorReport: true, 
    blankReport: true, 
    pvReport: true, 
    uvReport: true, 
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