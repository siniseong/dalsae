import React, { useState } from 'react';
import './App.css';
import loadingImage from './image.webp'; 

function App() {
  const [context, setContext] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true); 

    try {
      const response = await fetch('http://localhost:3001/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('메시지를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>달새</h1>
        <p>당신의 상황을 알려주세요! 달새가 메시지 형식을 알려드릴게요!</p>
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
        {isLoading && <img src={loadingImage} alt="로딩 중..." className="loading-image" />}
        {message && !isLoading && (
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
