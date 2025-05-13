'use client';

import { useEffect, useState } from 'react';
import Message from '../../components/Message';
import styles from './ChatPage.module.css';
import GoalCard from 'src/components/GoalCard';

type ChatMessage = {
    role: 'USER' | 'BOT';
    text: string;
};

const LOCAL_STORAGE_KEY = 'chatMessages';

export default function ChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');

    useEffect(() => {
        const savedPrompt = localStorage.getItem('chatbotPrompt');
        const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (savedPrompt) setSystemPrompt(savedPrompt);
        if (savedMessages) setMessages(JSON.parse(savedMessages));
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: ChatMessage = { role: 'USER', text: input };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput('');

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { role: 'BOT', text: `${systemPrompt}` },
            ]);
        }, 500);
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.messagesWindow}>
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

            <div className={styles.goalsSection}>
                <h2>Your Study Goals</h2>
                <GoalCard
                    title="Finish Chapter 5 - Biology"
                    summary="Review key concepts like DNA replication and complete textbook exercises."
                />
                <GoalCard
                    title="Practice Calculus Problems"
                    summary="Solve at least 10 integration problems from the worksheet."
                />
            </div>
        </div>


    );
}
