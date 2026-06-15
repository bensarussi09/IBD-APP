import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://6acee0309376f2c06a3e7063fd6961f6@o4511570893668352.ingest.de.sentry.io/4511570897141840",
    sendDefaultPii: false,
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();