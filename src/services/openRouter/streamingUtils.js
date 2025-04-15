import parsePredictions, { cleanPredictions } from "./parsePredictions";
import i18n from "i18next";

// 预测类型数组，用于生成不同类型的预测标签
// 尽管我们不再在流式输出中使用它，但它仍然在PredictionItem组件中使用
// 包含中文和英文的预测类型
export const PREDICTION_TYPES = {
  zh: ["正向", "负向", "中立"],
  en: ["Positive", "Negative", "Neutral"],
};

/**
 * 检查模型是否支持真实流式输出
 * @param {string} modelId - 模型ID (不再使用，保留参数以保持兼容性)
 * @returns {boolean} - 始终返回true，表示所有模型都使用真实流式输出
 */
export const supportsRealStreaming = () => {
  // 不再检测模型提供商，始终返回true以使用真实流式输出
  return true;
};

/**
 * 真实的流式输出处理
 * @param {Object} apiClient - API客户端
 * @param {Array} messages - 消息数组
 * @param {Array} predictions - 预测结果数组
 * @param {number} count - 预测数量
 * @param {Function} onUpdate - 更新回调
 * @param {string} modelId - 模型ID
 */
export const realStreamingOutput = async (
  apiClient,
  messages,
  predictions,
  count,
  onUpdate,
  modelId
) => {
  try {
    // 使用fetch API进行流式请求
    const response = await fetch(
      `${apiClient.defaults.baseURL}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiClient.defaults.headers.Authorization,
        },
        body: JSON.stringify({
          model: modelId,
          messages: messages,
          stream: true,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 获取响应的可读流
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let fullContent = "";
    let inThinkTag = false; // 标记是否在 <think> 标签内
    let thinkContent = ""; // 存储 <think> 标签内的内容

    // 初始化预测结果 - 不显示前缀
    for (let i = 0; i < count; i++) {
      predictions[i] = ""; // 初始化为空字符串，不显示前缀
    }
    onUpdate([...predictions]);

    // 读取流数据
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // 解码数据
      buffer += decoder.decode(value, { stream: true });

      // 处理数据行
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim() === "" || !line.startsWith("data:")) continue;
        if (line.includes("[DONE]")) continue;

        try {
          const data = JSON.parse(line.substring(5));
          if (!data.choices || !data.choices[0]) continue;

          const { delta } = data.choices[0];

          // 检查是否有reasoning_content字段（某些模型特有，如DeepSeek R1）
          if (delta && delta.reasoning_content) {
            // 如果有推理过程，则将其添加到全局推理内容中
            // 根据当前语言设置决定使用中文或英文标记
            const currentLang = i18n.language || "en";

            if (
              !fullContent.includes("推理过程:") &&
              !fullContent.includes("Reasoning Process:")
            ) {
              fullContent +=
                currentLang === "zh" ? "推理过程: " : "Reasoning Process: ";
            }
            fullContent += delta.reasoning_content;

            // 将推理过程添加到第一个预测中
            if (predictions.length > 0) {
              const firstPrediction =
                typeof predictions[0] === "object" && predictions[0] !== null
                  ? predictions[0]
                  : { text: "" }; // 不显示前缀

              predictions[0] = {
                text: firstPrediction.text,
                reasoning:
                  (firstPrediction.reasoning || "") + delta.reasoning_content,
              };

              // 回调更新
              onUpdate([...predictions]);
            }
            continue;
          }

          // 处理正常的内容
          if (!delta || !delta.content) continue;

          // 提取内容
          const content = delta.content;
          fullContent += content;

          // 检测并处理 <think> 和 </think> 标签
          if (content.includes("<think>") && !inThinkTag) {
            inThinkTag = true;
            // 如果在同一个内容块中有开始和结束标签
            if (content.includes("</think>")) {
              const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/i);
              if (thinkMatch && thinkMatch[1]) {
                thinkContent += thinkMatch[1];
                inThinkTag = false;
              }
            } else {
              // 只有开始标签
              const parts = content.split("<think>");
              if (parts.length > 1) {
                thinkContent += parts[1];
              }
            }
          } else if (content.includes("</think>") && inThinkTag) {
            // 结束标签
            const parts = content.split("</think>");
            if (parts.length > 0) {
              thinkContent += parts[0];
            }
            inThinkTag = false;
          } else if (inThinkTag) {
            // 在标签内的内容
            thinkContent += content;
          }

          // 如果有思考过程内容，将其添加为推理过程
          if (thinkContent) {
            // 将思考过程添加到第一个预测中
            if (predictions.length > 0) {
              const firstPrediction =
                typeof predictions[0] === "object" && predictions[0] !== null
                  ? predictions[0]
                  : { text: "" };

              predictions[0] = {
                text: firstPrediction.text,
                reasoning: thinkContent,
              };
            }
          }

          // 尝试解析当前累积的内容，指定正在流式输出中
          const currentPredictions = parsePredictions(fullContent, count, true);

          // 更新预测结果
          for (let i = 0; i < count; i++) {
            if (currentPredictions[i]) {
              const isObjectPrediction =
                typeof currentPredictions[i] === "object" &&
                currentPredictions[i] !== null;

              if (isObjectPrediction) {
                const predictionText = currentPredictions[i].text;
                const reasoning = currentPredictions[i].reasoning;

                // 在流式输出过程中，始终使用预测文本，即使是错误消息也会在最终结果中显示
                // 这样可以避免在生成过程中过早显示错误消息
                predictions[i] = {
                  text: predictionText,
                  reasoning: reasoning,
                };
              } else {
                // 直接使用预测文本，不添加前缀，即使是错误消息
                predictions[i] = currentPredictions[i];
              }
            }
          }

          // 回调更新
          onUpdate([...predictions]);
        } catch (e) {
          console.error("Error parsing streaming data:", e, line);
        }
      }
    }

    // 确保思考过程被添加到最终结果中
    if (thinkContent) {
      // 将思考过程添加到第一个预测中
      if (predictions.length > 0) {
        const firstPrediction =
          typeof predictions[0] === "object" && predictions[0] !== null
            ? predictions[0]
            : { text: "" };

        predictions[0] = {
          text: firstPrediction.text,
          reasoning: thinkContent,
        };
      }
    }

    // 最终解析完整内容，此时流式输出已结束
    const finalPredictions = parsePredictions(fullContent, count, false);

    // 更新最终结果
    for (let i = 0; i < count; i++) {
      if (finalPredictions[i]) {
        const isObjectPrediction =
          typeof finalPredictions[i] === "object" &&
          finalPredictions[i] !== null;

        // 直接使用预测文本，不添加前缀
        if (isObjectPrediction) {
          predictions[i] = {
            text: finalPredictions[i].text,
            reasoning: finalPredictions[i].reasoning,
          };
        } else {
          predictions[i] = finalPredictions[i];
        }
      }
    }

    // 清理预测结果，去除"预测数字:"前缀
    const cleanedPredictions = cleanPredictions(predictions);

    // 最终回调
    onUpdate(cleanedPredictions);
  } catch (error) {
    console.error("真实流式输出处理错误:", error);
    throw error;
  }
};

/**
 * 模拟流式输出
 * @param {Array} results - API返回的结果
 * @param {Array} predictions - 预测结果数组
 * @param {number} count - 预测数量
 * @param {Function} onUpdate - 更新回调
 */
export const simulateStreamingOutput = async (
  results,
  predictions,
  count,
  onUpdate
) => {
  // 确保结果数量与预期一致
  const validResults = results.slice(0, count);

  // 调试输出
  console.log(`处理${validResults.length}个有效预测结果`);

  // 检查是否有思考过程
  // 注意：在模拟流式输出中，我们不需要额外处理思考过程
  // 因为它已经在parsePredictions中被处理并包含在结果中

  // 对每个预测结果进行处理
  for (let i = 0; i < validResults.length; i++) {
    const result = validResults[i];
    const isObjectResult = typeof result === "object" && result !== null;
    const textContent = isObjectResult ? result.text : result;
    const reasoning = isObjectResult ? result.reasoning : "";

    // 初始化预测结果 - 不显示前缀
    if (isObjectResult) {
      predictions[i] = { text: "", reasoning };
    } else {
      predictions[i] = "";
    }
    onUpdate([...predictions]);

    // 模拟逐字输出
    const chars = textContent.split("");
    for (let j = 0; j < chars.length; j++) {
      // 每隔几个字符更新一次，提高性能
      if (j % 3 === 0 || j === chars.length - 1) {
        // 直接使用预测文本，不添加前缀
        if (isObjectResult) {
          predictions[i] = {
            text: textContent.substring(0, j + 1),
            reasoning,
          };
        } else {
          predictions[i] = textContent.substring(0, j + 1);
        }
        onUpdate([...predictions]);

        // 添加随机延迟，模拟真实的流式输出
        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 30 + 10)
        );
      }
    }

    // 在不同预测之间添加延迟
    if (i < validResults.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  // 清理预测结果，去除"预测数字:"前缀
  const cleanedPredictions = cleanPredictions(predictions);

  // 最终回调
  onUpdate(cleanedPredictions);
};

export default {
  supportsRealStreaming,
  realStreamingOutput,
  simulateStreamingOutput,
  PREDICTION_TYPES,
};
