import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import styles from "./styles/Message.module.css";

/**
 * 消息组件 - 用于显示通知消息
 * @param {Object} props - 组件属性
 * @param {string} props.content - 消息内容
 * @param {string} props.type - 消息类型 (success, error, info, warning)
 * @param {number} props.duration - 显示持续时间(毫秒)，默认3000ms
 * @param {Function} props.onClose - 关闭回调
 */
const Message = ({ content, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // 等待淡出动画完成后执行onClose
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`${styles.message} ${styles[type]} ${
        visible ? styles.visible : styles.hidden
      }`}
    >
      <span className={styles.icon}>
        {type === "success" && "✓"}
        {type === "error" && "✗"}
        {type === "info" && "ℹ"}
        {type === "warning" && "⚠"}
      </span>
      <span className={styles.content}>{content}</span>
    </div>
  );
};

/**
 * 创建消息容器
 * @returns {HTMLElement} 消息容器DOM元素
 */
const createMessageContainer = () => {
  const containerId = "message-container";
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    container.id = containerId;

    // 直接应用样式，而不依赖CSS模块的类名
    container.style.position = "fixed";
    container.style.top = "20px";
    container.style.left = "50%";
    container.style.transform = "translateX(-50%)";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.pointerEvents = "none";

    // 仍然保留类名，以便兼容开发环境
    container.className = styles.messageContainer;

    document.body.appendChild(container);
  }

  return container;
};

/**
 * 显示消息
 * @param {string} content - 消息内容
 * @param {string} type - 消息类型
 * @param {number} duration - 显示持续时间(毫秒)
 * @returns {Function} 关闭消息的函数
 */
const showMessage = (content, type = "info", duration = 3000) => {
  const container = createMessageContainer();
  const messageDiv = document.createElement("div");
  container.appendChild(messageDiv);

  // 创建React根节点
  const root = createRoot(messageDiv);

  const removeMessage = () => {
    // 卸载组件
    root.unmount();
    // 移除DOM节点
    if (messageDiv.parentNode) {
      messageDiv.parentNode.removeChild(messageDiv);
    }
  };

  // 添加内联样式的消息组件
  const StyledMessage = () => {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
        if (removeMessage) {
          setTimeout(removeMessage, 300); // 等待淡出动画完成后执行onClose
        }
      }, duration);

      return () => clearTimeout(timer);
    }, [duration]);

    // 消息容器样式
    const messageStyle = {
      marginBottom: "10px",
      padding: "10px 16px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      display: "flex",
      alignItems: "center",
      minWidth: "200px",
      maxWidth: "80vw",
      backgroundColor: "white",
      pointerEvents: "auto",
      transition: "all 0.3s ease",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-20px)",
    };

    // 根据类型设置颜色
    const typeStyles = {
      info: {
        backgroundColor: "#e6f7ff",
        borderLeft: "4px solid #1890ff",
        iconColor: "#1890ff",
      },
      success: {
        backgroundColor: "#f6ffed",
        borderLeft: "4px solid #52c41a",
        iconColor: "#52c41a",
      },
      error: {
        backgroundColor: "#fff2f0",
        borderLeft: "4px solid #ff4d4f",
        iconColor: "#ff4d4f",
      },
      warning: {
        backgroundColor: "#fffbe6",
        borderLeft: "4px solid #faad14",
        iconColor: "#faad14",
      },
    };

    const typeStyle = typeStyles[type] || typeStyles.info;

    // 合并样式
    const finalStyle = {
      ...messageStyle,
      backgroundColor: typeStyle.backgroundColor,
      borderLeft: typeStyle.borderLeft,
    };

    // 图标样式
    const iconStyle = {
      marginRight: "8px",
      fontSize: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: typeStyle.iconColor,
    };

    // 内容样式
    const contentStyle = {
      fontSize: "14px",
      lineHeight: "1.5",
      wordBreak: "break-word",
    };

    // 获取图标
    const getIcon = () => {
      switch (type) {
        case "success":
          return "✓"; // ✓ = √
        case "error":
          return "✗"; // ✗ = ×
        case "warning":
          return "⚠"; // ⚠ = ❗
        default:
          return "ℹ"; // ℹ = i
      }
    };

    return (
      <div style={finalStyle}>
        <span style={iconStyle}>{getIcon()}</span>
        <span style={contentStyle}>{content}</span>
      </div>
    );
  };

  // 渲染消息组件
  root.render(<StyledMessage />);

  return removeMessage;
};

// 导出不同类型的消息方法
const MessageAPI = {
  info: (content, duration) => showMessage(content, "info", duration),
  success: (content, duration) => showMessage(content, "success", duration),
  error: (content, duration) => showMessage(content, "error", duration),
  warning: (content, duration) => showMessage(content, "warning", duration),
};

export default MessageAPI;
