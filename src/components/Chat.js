import React, { useEffect, useState, useRef } from 'react';
import socket from '../socket';
import axios from 'axios';

function Chat({ room, username }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    socket.emit('joinRoom', room);

    axios.get(`http://localhost:5000/api/messages/${room}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setMessages(res.data);
    })
    .catch(err => {
      console.error('Error fetching messages:', err);
    });

    socket.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, { ...msg, status: 'received' }]);
    });

    socket.on('typing', ({ user }) => {
      setTypingUser(`${user} is typing...`);
      setTimeout(() => setTypingUser(''), 1000);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('typing');
    };
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const token = localStorage.getItem('token');
    const msg = {
      room,
      user: username,
      text,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    try {
      await axios.post('http://localhost:5000/api/messages', msg, {
        headers: { Authorization: `Bearer ${token}` }
      });
      socket.emit('sendMessage', msg);
      setMessages(prev => [...prev, msg]);
      setText('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleTyping = () => {
    socket.emit('typing', { room, user: username });
  };

  return (
    <div>
      <h2>Room: {room}</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid gray', padding: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.user}:</strong> {msg.text}
            <div style={{ fontSize: '0.8em', color: 'gray' }}>
              {new Date(msg.timestamp).toLocaleTimeString()} • {msg.status}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <p style={{ fontStyle: 'italic', color: 'gray' }}>{typingUser}</p>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onInput={handleTyping}
        placeholder="Type message..."
        style={{ width: '70%', marginRight: '10px' }}
      />
      <button onClick={sendMessage} disabled={!text.trim()}>Send</button>
    </div>
  );
}

export default Chat;
