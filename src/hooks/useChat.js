// 不需要useState和useEffect，因为我们使用useLocalStorage
import useLocalStorage from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants";
import { formatCurrentTimestamp } from "../utils";

/**
 * 自定义钩子，用于管理聊天消息
 * @returns {Object} - 包含聊天状态和方法的对象
 */
export const useChat = () => {
  // 使用localStorage存储聊天消息和背景上下文
  const [messages, setMessages] = useLocalStorage(
    STORAGE_KEYS.CHAT_MESSAGES,
    []
  );
  const [backgroundContext, setBackgroundContext] = useLocalStorage(
    STORAGE_KEYS.BACKGROUND_CONTEXT,
    ""
  );

  /**
   * 添加新消息
   * @param {Object} message - 消息对象
   */
  const addMessage = (message) => {
    // 添加时间戳（本地时间格式）
    const timestamp = formatCurrentTimestamp();
    setMessages([...messages, { ...message, timestamp }]);
  };

  /**
   * 删除消息
   * @param {number} index - 消息索引
   */
  const deleteMessage = (index) => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };

  /**
   * 生成聊天内容字符串
   * @returns {string} - 格式化的聊天内容
   */
  const generateChatContent = () => {
    return messages
      .map((msg) => {
        const timeStr = msg.timestamp ? `${msg.timestamp} ` : "";
        // 使用更明确的标识符来区分用户和其他方
        return `${timeStr}${msg.type === "self" ? "[Me]" : "[Other]"}: ${
          msg.content
        }`;
      })
      .join("\n");
  };

  /**
   * 获取完整上下文（背景上下文 + 聊天内容）
   * @returns {string} - 完整上下文
   */
  const getFullContext = () => {
    const chatContent = generateChatContent();
    return backgroundContext
      ? `# Background Information
${backgroundContext}

# Dialogue Record
${chatContent}`
      : `# Dialogue Record
${chatContent}`;
  };

  /**
   * 清除所有聊天消息
   */
  const clearMessages = () => {
    setMessages([]);
  };

  /**
   * 清除背景上下文
   */
  const clearBackgroundContext = () => {
    setBackgroundContext("");
  };

  /**
   * 清除所有数据
   */
  const clearAll = () => {
    clearMessages();
    clearBackgroundContext();
  };

  return {
    messages,
    backgroundContext,
    setBackgroundContext,
    addMessage,
    deleteMessage,
    getFullContext,
    hasMessages: messages.length > 0,
    clearMessages,
    clearBackgroundContext,
    clearAll,
  };
};

export default useChat;
