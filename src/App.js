import React, { useState } from 'react';
import Chat from './components/Chat';
import Login from './components/Login';

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleLogin = (user) => {
    setUsername(user);
    setLoggedIn(true);
  };

  const handleJoin = () => {
    if (room.trim()) {
      setJoined(true);
    }
  };

  if (!loggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div style={{ padding: '20px' }}>
      {!joined ? (
        <>
          <h1>Welcome, {username} 👋</h1>
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={handleJoin}>Join Chat</button>
        </>
      ) : (
        <Chat room={room} username={username} />
      )}
    </div>
  );
}

export default App;
