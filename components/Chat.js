"use client";

import React, { useState } from "react";
import styles from "./Chat.module.css";
import Image from "next/image";
import ChatMessage from "./ChatMessage";
import getColorByName from "@/utils/colors";

const Chat = ({ name, type, onClose }) => {
  const pokemonName = name?.charAt(0).toUpperCase() + name?.slice(1);
  const handleButtonClick = () => {
    onClose(false);
  };

  const color = type ? getColorByName(type[0]?.type?.name) : "#000";

  const headingColorStyle = {
    background: color,
  };

  const backgroundColor = `${color}33`;

  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `Welcome to the ${pokemonName} Chat! I am a friendly chatbot designed to emulate conversations with Pokemon. You can talk to ${pokemonName} just like you would in the Pokemon world. Type your messages below, and ${pokemonName} will respond with cheerful and playful phrases that fit its personality.`,
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (messageContent) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: messageContent },
    ]);
    chatData(messageContent);
    setIsTyping(true);
  };

  const chatData = async (userMessage) => {
    const message = [...messages, { role: "user", content: userMessage }];
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error("Chat API request failed");
      }

      const responseData = await response.json();
      if (responseData.choices && responseData.choices.length > 0) {
        setIsTyping(false);

        const assistantMessage = responseData.choices[0].message;
        if (assistantMessage && assistantMessage.content) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "assistant",
              content: assistantMessage.content,
            },
          ]);
        }
      } else {
        console.error("Invalid responseData structure:", responseData);
        setIsTyping(false);
      }
    } catch (error) {
      console.error("Error while fetching chat data:", error);
      setIsTyping(false);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.container}>
      <div style={headingColorStyle} className={styles.top}>
        <div className={styles.heading}>{pokemonName}</div>
        <button className={styles["btn-close"]} onClick={handleButtonClick}>
          <Image src="./cancel.svg" width={12} height={12} alt="cancel-icon" />
        </button>
      </div>
      <ChatMessage
        pokemonName={pokemonName}
        messages={messages}
        isTyping={isTyping}
        color={backgroundColor}
      />
      <form
        className={styles["chat-input-form"]}
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.messageInput.value;
          if (input.trim() !== "") {
            handleSendMessage(input);
            e.target.reset();
          }
        }}
      >
        <input
          type="text"
          name="messageInput"
          placeholder="Type your message..."
          disabled={isTyping}
        />
        <button
          className={styles["btn-send"]}
          type="submit disabled={isTyping}"
          disabled={isTyping}
        >
          <Image src="./send.svg" width={16} height={16} alt="send-icon" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
