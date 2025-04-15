import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/NewMessageInput.module.css";
import { MESSAGE_TYPES } from "../../constants";

/**
 * New message input component
 * @param {Object} props - Component properties
 * @param {Function} props.onAddMessage - Add message callback function
 */
const NewMessageInput = ({ onAddMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState(MESSAGE_TYPES.SELF);
  const { t } = useTranslation();

  const handleAddMessage = () => {
    if (!newMessage.trim()) return;

    onAddMessage({
      content: newMessage,
      type: messageType,
    });

    setNewMessage("");
  };

  return (
    <div className={styles.newMessageInput}>
      <div className={styles.messageTypeSelector}>
        <label
          className={messageType === MESSAGE_TYPES.SELF ? styles.selected : ""}
        >
          <input
            type="radio"
            name="newMessageType"
            value={MESSAGE_TYPES.SELF}
            checked={messageType === MESSAGE_TYPES.SELF}
            onChange={() => setMessageType(MESSAGE_TYPES.SELF)}
          />
          <span className={styles.radioIcon}>👤</span>{" "}
          {t("chat.newMessage.self")}
        </label>
        <label
          className={messageType === MESSAGE_TYPES.OTHER ? styles.selected : ""}
        >
          <input
            type="radio"
            name="newMessageType"
            value={MESSAGE_TYPES.OTHER}
            checked={messageType === MESSAGE_TYPES.OTHER}
            onChange={() => setMessageType(MESSAGE_TYPES.OTHER)}
          />
          <span className={styles.radioIcon}>👥</span>{" "}
          {t("chat.newMessage.other")}
        </label>
      </div>

      <div className={styles.messageInputContainer}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={t("chat.newMessage.placeholder")}
          rows={2}
        />
        <button
          className={styles.addMessageButton}
          onClick={handleAddMessage}
          disabled={!newMessage.trim()}
        >
          {t("chat.newMessage.add")}
        </button>
      </div>

      {newMessage && (
        <div className={styles.charCount}>
          {t("chat.newMessage.charCount", { count: newMessage.length })}
        </div>
      )}
    </div>
  );
};

export default NewMessageInput;
