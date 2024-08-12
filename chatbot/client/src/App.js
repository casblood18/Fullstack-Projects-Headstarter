import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/openai/chat', {
        prompt,
      });
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      setResponse('Sorry, something went wrong.');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Chatbot</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            placeholder="Enter your message here..."
          />
          <br />
          <button type="submit">Send</button>
        </form>
        <div className="response">
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
}

export default App;