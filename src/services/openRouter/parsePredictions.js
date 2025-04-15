import i18n from "i18next";

/**
 * 去除字符串最外层的引号
 * @param {string} text - 输入字符串
 * @returns {string} - 去除引号后的字符串
 */
export const removeOuterQuotes = (text) => {
  // 检查是否被单引号或双引号包围
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    return text.substring(1, text.length - 1);
  }
  return text;
};

/**
 * 解析预测结果
 * @param {string} content - API返回的内容
 * @param {number} count - 预期的预测数量
 * @param {boolean} [isStreaming=false] - 是否在流式输出中
 * @returns {Array} - 解析后的预测结果数组
 */
export const parsePredictions = (content, count, isStreaming = false) => {
  // 提取推理过程
  let reasoning = "";

  // 检查是否有 <think> </think> 标签
  const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/i);
  if (thinkMatch && thinkMatch[1]) {
    reasoning = thinkMatch[1].trim();
  } else {
    // 如果没有 <think> 标签，则尝试匹配传统的 "推理过程:" 格式
    // 注意：我们需要确保只提取推理过程部分，而不包含预测结果

    // 匹配中文格式 "推理过程:"
    const zhReasoningMatch = content.match(
      /推理过程:\s*([\s\S]*?)(?=\s*预测\d+|$)/i
    );
    // 匹配英文格式 "Reasoning Process:"
    const enReasoningMatch = content.match(
      /Reasoning Process:\s*([\s\S]*?)(?=\s*Prediction\s*\d+|$)/i
    );

    if (zhReasoningMatch && zhReasoningMatch[1]) {
      reasoning = zhReasoningMatch[1].trim();
    } else if (enReasoningMatch && enReasoningMatch[1]) {
      reasoning = enReasoningMatch[1].trim();
    }
  }

  // 从内容中移除 <think> </think> 部分，以便正确解析预测结果
  let cleanedContent = content.replace(/<think>[\s\S]*?<\/think>/i, "");

  // 提取预测结果
  const predictions = [];

  // 定义中文和英文正则表达式
  // 中文格式：预测1 (正向): 内容 或 预测1: 内容
  const zhRegex =
    /预测(\d+)(?:\s*\(\s*(?:正向|负向|中立)\s*\))?\s*:\s*([\s\S]*?)(?=预测\d+|$)/g;
  // 英文格式：Prediction 1 (Positive): content 或 Prediction 1: content
  const enRegex =
    /Prediction\s*(\d+)(?:\s*\(\s*(?:Positive|Negative|Neutral)\s*\))?\s*:\s*([\s\S]*?)(?=Prediction\s*\d+|$)/g;

  // 先尝试匹配中文格式
  let match;
  let hasMatches = false;

  // 尝试匹配中文格式
  while ((match = zhRegex.exec(cleanedContent || content)) !== null) {
    hasMatches = true;
    const index = parseInt(match[1]) - 1;
    const text = match[2] ? match[2].trim() : "";

    if (index >= 0 && index < count) {
      predictions[index] = text;
    }
  }

  // 如果没有匹配到中文格式，尝试匹配英文格式
  if (!hasMatches) {
    while ((match = enRegex.exec(cleanedContent || content)) !== null) {
      const index = parseInt(match[1]) - 1;
      const text = match[2] ? match[2].trim() : "";

      if (index >= 0 && index < count) {
        predictions[index] = text;
      }
    }
  }

  // 填充缺失的预测
  for (let i = 0; i < count; i++) {
    if (!predictions[i]) {
      // 如果在流式输出中，不显示错误消息，而是保持空字符串
      if (isStreaming) {
        predictions[i] = "";
      } else {
        // 仅在非流式输出时显示错误消息
        // 使用当前语言设置决定错误消息语言
        const currentLang = i18n.language || "en";
        predictions[i] =
          currentLang === "zh"
            ? `[无法生成预测 ${i + 1}]`
            : `[Failed to generate prediction ${i + 1}]`;
      }
    }
  }

  // 如果有推理过程，则将其添加到第一个预测中
  if (reasoning && predictions.length > 0) {
    // 只将第一个预测转换为对象形式，并添加推理过程
    const result = [...predictions];
    result[0] = { text: predictions[0], reasoning };
    return result;
  }

  return predictions;
};

/**
 * 清理预测结果
 * @param {Array} predictions - 预测结果数组
 * @returns {Array} - 清理后的预测结果
 */
export const cleanPredictions = (predictions) => {
  // 提取推理过程（如果存在）
  let reasoning = "";
  if (
    predictions.length > 0 &&
    typeof predictions[0] === "object" &&
    predictions[0] !== null
  ) {
    reasoning = predictions[0].reasoning || "";
  }

  // 清理预测结果
  const cleanedPredictions = predictions.map((p) => {
    // 如果是对象形式，处理text属性
    if (typeof p === "object" && p !== null) {
      // 定义中文和英文正则表达式
      // 中文格式：预测1 (正向): 内容 或 预测1: 内容
      const zhMatch = p.text.match(
        /^预测\d+(?:\s*\(\s*(?:正向|负向|中立)\s*\))?\s*:\s*(.+)$/s
      );
      // 英文格式：Prediction 1 (Positive): content 或 Prediction 1: content
      const enMatch = p.text.match(
        /^Prediction\s*\d+(?:\s*\(\s*(?:Positive|Negative|Neutral)\s*\))?\s*:\s*(.+)$/s
      );

      let text;
      if (zhMatch) {
        text = zhMatch[1].trim();
      } else if (enMatch) {
        text = enMatch[1].trim();
      } else {
        text = p.text.trim();
      }

      // 去除最外层的引号
      text = removeOuterQuotes(text);
      return text;
    }

    // 如果是字符串形式
    // 定义中文和英文正则表达式
    // 中文格式：预测1 (正向): 内容 或 预测1: 内容
    const zhMatch = p.match(
      /^预测\d+(?:\s*\(\s*(?:正向|负向|中立)\s*\))?\s*:\s*(.+)$/s
    );
    // 英文格式：Prediction 1 (Positive): content 或 Prediction 1: content
    const enMatch = p.match(
      /^Prediction\s*\d+(?:\s*\(\s*(?:Positive|Negative|Neutral)\s*\))?\s*:\s*(.+)$/s
    );

    let text;
    if (zhMatch) {
      text = zhMatch[1].trim();
    } else if (enMatch) {
      text = enMatch[1].trim();
    } else {
      text = p.trim();
    }

    // 去除最外层的引号
    text = removeOuterQuotes(text);
    return text;
  });

  // 如果有推理过程，将其添加到第一个预测中
  if (reasoning && cleanedPredictions.length > 0) {
    // 只将第一个预测转换为对象形式，其他保持原样
    const result = [...cleanedPredictions];
    result[0] = { text: cleanedPredictions[0], reasoning };
    return result;
  }

  return cleanedPredictions;
};

export default parsePredictions;
