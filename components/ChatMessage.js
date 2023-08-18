import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatMessage.module.css";

const ChatMessage = ({ messages, pokemonName, isTyping, color }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (dots.length < 3) {
        setDots(dots + ".");
      } else {
        setDots("");
      }
    }, 500);

    return () => clearInterval(interval);
  }, [dots]);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <div ref={chatMessagesRef} className={styles["chat-messages"]}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${styles[message.role]}`}
            style={message.role === "assistant" ? { background: color } : {}}
          >
            {message.content}
          </div>
        ))}
        {isTyping && (
          <div className={styles["typing-message"]}>
            {pokemonName} is typing{dots}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
