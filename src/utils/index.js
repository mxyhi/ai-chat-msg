import MessageAPI from "../components/Common/Message";

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} - 复制是否成功
 */
export const copyToClipboard = async (text) => {
  // 首先尝试使用现代的 Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn("现代剪贴板 API 失败，尝试回退方案:", error);
      // 如果失败，尝试回退方案
    }
  }

  // 回退方案：使用临时文本区域
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // 防止滚动到视图中
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);

    // 聚焦并选中文本
    textArea.focus();
    textArea.select();

    // 执行复制命令
    const successful = document.execCommand("copy");

    // 清理
    document.body.removeChild(textArea);

    return successful;
  } catch (error) {
    console.error("复制到剪贴板失败:", error);
    return false;
  }
};

/**
 * 显示通知消息
 * @param {string} message - 通知消息
 * @param {string} type - 消息类型 (success, error, info, warning)
 * @param {number} duration - 显示持续时间(毫秒)，默认3000ms
 */
export const showNotification = (message, type = "info", duration = 3000) => {
  return MessageAPI[type](message, duration);
};

/**
 * 从本地存储中获取数据
 * @param {string} key - 存储键
 * @param {any} defaultValue - 默认值
 * @returns {any} - 存储的数据
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("从本地存储获取数据失败:", error);
    return defaultValue;
  }
};

/**
 * 将数据保存到本地存储
 * @param {string} key - 存储键
 * @param {any} value - 要存储的数据
 * @returns {boolean} - 保存是否成功
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("保存到本地存储失败:", error);
    return false;
  }
};

/**
 * 格式化当前时间为 YYYY-MM-DD HH:mm:ss 格式
 * @returns {string} - 格式化的时间字符串
 */
export const formatCurrentTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 导出消息API的各个方法，方便直接使用
export const message = {
  info: MessageAPI.info,
  success: MessageAPI.success,
  error: MessageAPI.error,
  warning: MessageAPI.warning,
};

export default {
  copyToClipboard,
  showNotification,
  getFromStorage,
  saveToStorage,
  formatCurrentTimestamp,
  message,
};
