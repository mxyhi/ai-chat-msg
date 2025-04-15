import React from "react";
import styles from "./styles/ChatMessage.module.css";

/**
 * 聊天消息组件
 * @param {Object} props - 组件属性
 * @param {string} props.content - 消息内容
 * @param {string} props.type - 消息类型，'self'表示自己的消息，'other'表示对方的消息
 * @param {string} props.timestamp - 消息时间戳
 * @param {Function} props.onDelete - 删除消息的回调函数
 */
const ChatMessage = ({ content, type, timestamp, onDelete }) => {
  return (
    <div
      className={`${styles.chatMessage} ${
        type === "self" ? styles.self : styles.other
      }`}
    >
      {timestamp && (
        <div className={styles.timestamp}>
          <span className={styles.timeIcon}>🕒</span> {timestamp}
        </div>
      )}
      <div className={styles.messageContent}>{content}</div>
      {onDelete && (
        <button className={styles.deleteMessage} onClick={onDelete}>
          ×
        </button>
      )}
    </div>
  );
};

export default ChatMessage;
