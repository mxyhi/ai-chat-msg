import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/ChatContainer.module.css";
import ChatMessageList from "./ChatMessageList";
import NewMessageInput from "./NewMessageInput";

/**
 * Chat container component
 * @param {Object} props - Component properties
 * @param {Array} props.messages - Messages array
 * @param {Function} props.onAddMessage - Add message callback
 * @param {Function} props.onDeleteMessage - Delete message callback
 * @param {Function} props.onClearMessages - Clear all messages callback
 */
const ChatContainer = ({
  messages,
  onAddMessage,
  onDeleteMessage,
  onClearMessages,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <h2>{t("chat.title")}</h2>
        {messages && messages.length > 0 && (
          <button
            className={styles.clearButton}
            onClick={onClearMessages}
            title={t("chat.clearTitle")}
          >
            {t("chat.clear")}
          </button>
        )}
      </div>
      <div className={styles.chatContent}>
        <ChatMessageList
          messages={messages}
          onDeleteMessage={onDeleteMessage}
        />
        <NewMessageInput onAddMessage={onAddMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
