import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatMessage.module.css";
import Dots from "@/utils/dots";

const ChatMessage = ({ messages, pokemonName, isTyping, color }) => {
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
            {pokemonName} is typing
            <Dots />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
