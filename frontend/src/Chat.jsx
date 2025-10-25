import React, { useEffect, useState } from 'react';
import { sendMessage, getMessages } from './api';
import { useLocation, useNavigate } from 'react-router-dom';

function Chat() {
  const location = useLocation();
  const navigate = useNavigate();

  // ⛔ If no data is passed, go back
  if (!location.state) {
    navigate('/');
    return null;
  }

  const { senderId, receiverId } = location.state;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // auto refresh every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await getMessages(senderId, receiverId);
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      await sendMessage(senderId, receiverId, text);
      setText('');
      fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div>
      <h2>Chat with {receiverId}</h2>
      <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid black', padding: '10px' }}>
        {messages.map((msg) => (
          <p key={msg.id}><b>{msg.sender_id}:</b> {msg.content}</p>
        ))}
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chat;
