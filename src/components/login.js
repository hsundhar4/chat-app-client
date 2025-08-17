import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);

      // Notify parent component (App.js)
      onLogin(username);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Login to HemaChat 🔐</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button onClick={handleLogin} disabled={!username || !password}>
        Login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
