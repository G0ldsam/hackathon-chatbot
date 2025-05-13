import styles from './Message.module.css';

type MessageProps = {
  role: 'USER' | 'BOT';
  text: string;
};

export default function Message({ role, text }: MessageProps) {
  const isUser = role === 'USER';

  return (
    <div className={`${styles.messageRow} ${isUser ? styles.user : styles.bot}`}>
      <div className={styles.bubble}>{text}</div>
    </div>
  );
}
