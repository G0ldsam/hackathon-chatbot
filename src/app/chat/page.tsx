'use client';

import { useState } from 'react';
import Message from '../../components/Message';
import styles from './ChatPage.module.css';

type ChatMessage = {
  role: 'USER' | 'BOT';
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'USER', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesWindow}>
        <Message
            role='BOT'
            text='Hello , im here to help you define your styding goals'
        />
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} text={msg.text} />
        ))}
      </div>

      <div className={styles.inputRow}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
