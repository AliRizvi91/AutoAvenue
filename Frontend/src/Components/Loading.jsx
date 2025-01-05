// src/Loading.js
import React from 'react';
import '../CSSFiles/Loading.css'; // Import the CSS file for styling

function Loading() {
  return (
    <div className="loading-container">
      <img src="/assets/Images/Tyre.png" alt="Loading..." className="tire-image" />
    </div>
  );
}

export default Loading;
