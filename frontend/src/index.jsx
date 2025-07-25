// Application entry point: Start React and mount App in the DOM.
import React from 'react';   // Required to interpret JSX and manage components.
import ReactDOM from 'react-dom/client';   // Modern ReactDOM API for creating the root element.
import './index.css';  //Load global styles and TailwindCSS.
import App from './App';   // Our main component with the entire interface logic.

const root = ReactDOM.createRoot(document.getElementById('root')); // Search for <div id="root"> in the HTML.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // Enable additional checks in development and insert the app into the root
