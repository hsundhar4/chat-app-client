import React, { useState } from 'react';
import Chat from './components/Chat';

function App() {
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (room.trim() && username.trim()) {
      setJoined(true);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      {!joined ? (
        <div>
          <h1>Welcome to HemaChat 💬</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '10px', display: 'block' }}
          />
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={{ marginBottom: '10px', display: 'block' }}
          />
          <button onClick={handleJoin} disabled={!room.trim() || !username.trim()}>
            Join Chat
          </button>
        </div>
      ) : (
        <Chat room={room} username={username} />
      )}
    </div>
  );
}

export default App;
