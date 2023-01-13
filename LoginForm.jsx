import { useState } from 'react';
import axios from 'axios';
import React, { Component }  from 'react';

const projectID = '66c4bbc5-a068-4443-a801-2028457a156b';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': "66c4bbc5-a068-4443-a801-2028457a156b", 'User-Name': username, 'User-Secret': password };

    try {
        //username/password => chatengine -> give messages
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      // work out -> logged in
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (error) {
        //error -> try with new username...
      setError('Incorrect Credentials.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;