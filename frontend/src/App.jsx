
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [joke, setJoke] = useState(null);
  const [message, setMessage] = useState('Loading joke...');

  const fetchJoke = async () => {
    try {
      const response = await fetch('http://localhost:5000/joke', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch joke');
      const jokeData = await response.json();
      if (jokeData && jokeData.joke) {
        setJoke(jokeData);
        setMessage('');
      } else {
        setMessage("That's all the jokes for today! Come back another day!");
        setJoke(null);
      }      
    } catch (error) {
      console.error('Failed to fetch joke:', error);
      setMessage('Failed to load joke. Please try again later.');
    }
  };

  const vote = async (voteType) => {
    console.log(`Vote for joke ${joke.id}: ${voteType}`);
    try {
      await fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: joke.id, vote: voteType }),
        credentials: 'include',
      });
      fetchJoke();
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };
  
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="app">
      <div className="app-top-bar">
      <div className="top-bar-content">
          <img src="/images/logo.png" alt="Logo" className="app-logo" />
          <div className="user-info">
            <img src="/images/avatar.png" alt="User Avatar" className="user-avatar" />
            <span className="user-name">
              <p className='content'>Handcrafted by</p>
              <p className='name'>Jim HLS</p>  
            </span>
          </div>
        </div>
      </div>
      <header className="app-header">
        <h1>A joke a day keeps the doctor away</h1>
        <p>If you joke wrong way, your teeth have to pay. (Serious)</p>
      </header>
      <main className="app-content">
        {joke ? (
          <div className="joke-card">
            <p>{joke.joke}</p>
            <div className="button-container">
              <button className="button funny" onClick={() => vote('like')}>This is Funny!</button>
              <button className="button not-funny" onClick={() => vote('dislike')}>This is not funny.</button>
            </div>
          </div>
        ) : <p>{message}</p>}
      </main>
      <footer className="app-footer">
        <p className='content-footer'>This website is created as part of HIsolutions program. The materials contained on this website are provided for general information only and do not constitute any form of advice. HLS assumes no responsibility for the accuracy of any particular statement and accepts no liability for any loss or damage which may arise from reliance on the information contained on this site.</p>
        <p className='final-footer'>Copyright 2021 HLS</p>
      </footer>
    </div>
  );
}

export default App;

