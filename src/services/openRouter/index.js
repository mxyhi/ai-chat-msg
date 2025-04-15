import { API_CONFIG } from "../../constants";
import createApiClient from "./createApiClient";
import buildMessages from "./buildMessages";
import parsePredictions from "./parsePredictions";
import {
  supportsRealStreaming,
  realStreamingOutput,
  simulateStreamingOutput,
} from "./streamingUtils";

/**
 * 根据聊天上下文生成预测回复 (非流式)
 * @param {string} context - 聊天的背景上下文
 * @param {string} messageType - 预测类型，'self'表示预测自己的回复，'other'表示预测对方的回复
 * @param {string} newMessage - 最新的消息内容
 * @param {Object} apiConfig - API配置
 * @param {string} timestamp - 当前时间戳
 * @returns {Promise<string[]>} - 返回预测结果数组
 */
export const generatePredictions = async (
  context,
  messageType,
  newMessage,
  apiConfig = {},
  timestamp = ""
) => {
  try {
    // 创建API客户端
    const apiClient = createApiClient(apiConfig);

    // 构建消息
    const messages = buildMessages(context, messageType, newMessage, timestamp);

    // 调用API
    const response = await apiClient.post("/chat/completions", {
      model: apiConfig.model || API_CONFIG.DEFAULT_MODEL,
      messages: messages,
      n: 1, // 只请求一个结果，因为我们在系统提示中已经要求生成多个预测
      stream: true,
      temperature: API_CONFIG.TEMPERATURE,
    });

    // 提取预测结果
    const content = response.data.choices[0].message.content;

    // 解析多个预测
    const predictions = parsePredictions(content, API_CONFIG.PREDICTION_COUNT);

    return predictions;
  } catch (error) {
    console.error("生成预测时出错:", error);
    throw new Error(
      `生成预测失败: ${error.message || "请检查API密钥和网络连接"}`
    );
  }
};

/**
 * 根据聊天上下文生成预测回复 (流式)
 * @param {string} context - 聊天的背景上下文
 * @param {string} messageType - 预测类型，'self'表示预测自己的回复，'other'表示预测对方的回复
 * @param {string} newMessage - 最新的消息内容
 * @param {Function} onUpdate - 每次收到新的流式数据时的回调函数
 * @param {Object} apiConfig - API配置
 * @param {string} timestamp - 当前时间戳
 * @returns {Promise<void>} - 无返回值，通过回调函数提供结果
 */
export const generatePredictionsStream = async (
  context,
  messageType,
  newMessage,
  onUpdate,
  apiConfig = {},
  timestamp = ""
) => {
  try {
    // 创建API客户端
    const apiClient = createApiClient(apiConfig);

    // 获取预测数量
    const count = API_CONFIG.PREDICTION_COUNT;

    // 初始化预测结果数组
    const predictions = Array(count).fill("");

    // 获取当前使用的模型
    const modelId = apiConfig.model || API_CONFIG.DEFAULT_MODEL;

    // 检查模型是否支持真实流式输出
    const useRealStreaming = supportsRealStreaming(modelId);

    // 始终请求包含推理过程的格式，让模型自行决定是否生成推理过程
    // 我们将根据返回值中是否包含推理过程来决定是否展示
    console.log(`使用模型: ${modelId}, 支持真实流式输出: ${useRealStreaming}`);

    // 构建消息
    const messagesWithReasoning = buildMessages(
      context,
      messageType,
      newMessage,
      timestamp
    );

    if (useRealStreaming) {
      // 使用真实的流式API
      await realStreamingOutput(
        apiClient,
        messagesWithReasoning,
        predictions,
        count,
        onUpdate,
        modelId
      );
    } else {
      // 使用非流式API，但模拟流式输出
      const response = await apiClient.post("/chat/completions", {
        model: modelId,
        messages: messagesWithReasoning,
        n: 1, // 只请求一个结果，因为我们在系统提示中已经要求生成多个预测
        temperature: API_CONFIG.TEMPERATURE,
      });

      // 提取预测结果
      const content = response.data.choices[0].message.content;

      // 解析多个预测
      const results = parsePredictions(content, count);

      // 调试输出
      console.log(`解析得到${results.length}个预测结果:`, results);

      // 模拟流式输出
      await simulateStreamingOutput(results, predictions, count, onUpdate);
    }
  } catch (error) {
    console.error("生成预测时出错:", error);
    throw new Error(
      `生成预测失败: ${error.message || "请检查API密钥和网络连接"}`
    );
  }
};

/**
 * 获取可用模型列表
 * @param {Object} apiConfig - API配置
 * @returns {Promise<Array>} - 返回模型列表
 */
export const getAvailableModels = async (apiConfig = {}) => {
  try {
    // 创建API客户端
    const apiClient = createApiClient(apiConfig);

    // 调用模型列表API
    const response = await apiClient.get("/models");

    // 处理响应数据
    if (response.data && response.data.data) {
      return response.data.data.map((model) => ({
        id: model.id,
        name: model.name || model.id,
        provider: model.provider || "unknown",
      }));
    }

    return [];
  } catch (error) {
    console.error("获取模型列表失败:", error);
    throw new Error(`无法获取模型列表: ${error.message}`);
  }
};

export default {
  generatePredictions,
  generatePredictionsStream,
  getAvailableModels,
};
