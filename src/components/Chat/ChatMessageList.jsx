import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/ChatMessageList.module.css";
import ChatMessage from "./ChatMessage";

/**
 * Chat message list component
 * @param {Object} props - Component properties
 * @param {Array} props.messages - Message array, each message contains content and type properties
 * @param {Function} props.onDeleteMessage - Delete message callback function
 */
const ChatMessageList = ({ messages, onDeleteMessage }) => {
  const { t } = useTranslation();

  if (!messages || messages.length === 0) {
    return (
      <div className={styles.emptyChat}>
        <p>{t("chat.empty")}</p>
      </div>
    );
  }

  return (
    <div className={styles.chatMessages}>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          content={message.content}
          type={message.type}
          timestamp={message.timestamp}
          onDelete={() => onDeleteMessage(index)}
        />
      ))}
    </div>
  );
};

export default ChatMessageList;
