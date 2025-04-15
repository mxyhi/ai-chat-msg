import { useState } from "react";
import { generatePredictionsStream } from "../api";
import { message, formatCurrentTimestamp } from "../utils";
import { API_CONFIG } from "../constants";

/**
 * 自定义钩子，用于生成预测结果
 * @returns {Object} - 包含预测状态和方法的对象
 */
export const usePredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [timestamp, setTimestamp] = useState("");

  /**
   * 生成预测结果
   * @param {string} context - 聊天上下文
   * @param {string} messageType - 消息类型
   * @param {Object} apiConfig - API配置
   * @param {Function} onSuccess - 成功回调
   * @param {Function} onError - 错误回调
   */
  const generatePredictions = async (
    context,
    messageType,
    apiConfig,
    onSuccess,
    onError
  ) => {
    if (!context) {
      message.warning("请先添加聊天内容");
      return;
    }

    // 检查API密钥
    if (
      !apiConfig.apiKey &&
      !import.meta.env.VITE_OPENROUTER_API_KEY &&
      !API_CONFIG.DEFAULT_API_KEY
    ) {
      message.error("请先配置API密钥");
      if (onError) onError("missing_api_key");
      return;
    }

    setLoading(true);
    setStreaming(true);
    setPredictions([]);

    // 生成当前时间戳
    const currentTimestamp = formatCurrentTimestamp();
    setTimestamp(currentTimestamp);

    try {
      // 调用流式API
      await generatePredictionsStream(
        context,
        messageType,
        "",
        (updatedPredictions) => {
          console.log("更新预测:", updatedPredictions);
          setPredictions(updatedPredictions);
        },
        apiConfig,
        currentTimestamp
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("生成预测时出错:", error);
      message.error(error.message || "生成预测失败，请检查API密钥和网络连接");
      if (onError) onError(error);
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  return {
    predictions,
    loading,
    streaming,
    timestamp,
    generatePredictions,
    setPredictions,
  };
};

export default usePredictions;
