import React, { useState, useEffect } from 'react';

function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>MERN Stack Skeleton</h1>
      <p>Frontend is running on Vite + React</p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>Backend Status:</h3>
        {/* You can add a fetch call here later to test connectivity */}
        <p>Ready to connect to API...</p>
      </div>
    </div>
  );
}

export default App;