import React, { useState } from 'react';
import './App.css';

function App() {
  const [context, setContext] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3001/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ context }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>달새</h1>
        <input
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="상황을 입력해주세요."
          className="input-field"
        />
        <button onClick={handleSubmit} className="submit-button">
          확인하기
        </button>
        {message && (
          <div className="message-container">
            <h2>올바른 메시지 예시:</h2>
            <p className="generated-message">{message}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
