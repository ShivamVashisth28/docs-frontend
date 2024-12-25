import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function Socket() {
    const [messages, setMessages] = useState("");
  const [newMessage, setNewMessage] = useState('');
  const     [socket, setSocket] = useState(null);

  useEffect(() => {
// Connect to the server
    const socketInstance = io('http://localhost:5000'); 
    setSocket(socketInstance);

    // Listen for incoming messages
    socketInstance.on('receiveMessage', (message) => {
      setMessages((prev) => prev+message);
    });

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      socket.emit('sendMessage', newMessage); // Emit a message to the server
      setNewMessage('');
    }
  };

  useEffect(()=>{
    sendMessage()
  },[newMessage])
  return (
    <div>
    <h1>Socket.IO Chat App</h1>
    <div>
      {messages}
    </div>
    <input
      type="text"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder="Type a message..."
    />
    <button onClick={sendMessage}>Send</button>
  </div>
  )
}

export default Socket