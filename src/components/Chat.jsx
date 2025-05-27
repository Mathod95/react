// src/components/Chat.jsx
import React, { useState } from "react";

export function Chat({ chat, sendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat">
      <h3>💬 Chat</h3>
      <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i} className="chat-msg">{msg}</div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
        />
        <button onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
}
