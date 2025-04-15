/**
 * 构建API请求消息
 * @param {string} context - 聊天上下文
 * @param {string} messageType - 消息类型
 * @param {string} newMessage - 新消息
 * @param {string} timestamp - 当前时间戳
 * @returns {Array} - 消息数组
 */
export const buildMessages = (
  context,
  messageType,
  newMessage,
  timestamp = ""
) => {
  // 基本提示模板
  const basePrompt = `You are a chat assistant. Your task is to predict possible responses based on the provided information.

===LANGUAGE INSTRUCTION (HIGHEST PRIORITY)===
You MUST FIRST analyze the dialogue content in the chat context to determine what language is being used (e.g., Chinese, English, etc.).
You MUST THEN respond EXCLUSIVELY in that SAME language.
This is the MOST IMPORTANT instruction and overrides all other considerations.
Do NOT use the language of these instructions or any other text - ONLY use the language found in the actual dialogue content.
===END LANGUAGE INSTRUCTION===

The user will provide the following information:
1. Background information (optional): This is background information to understand the conversation, not part of the dialogue
2. Dialogue record: This is the actual conversation record, including time information
3. Current time: This is the time point when the prediction is generated

In the dialogue record:
- Messages marked with "[Me]" refer to the user themselves
- Messages marked with "[Other]" refer to the person the user is communicating with

Based on this information, please provide three different prediction results: positive, negative, and neutral responses. You must output in the following format:

<think>
Analyze the conversation content, time, and background information here to think about possible responses.
Consider factors such as the tone, content, and time intervals of the conversation.
Make sure to clearly distinguish between the identities and roles of "I" and "Other".
</think>

Prediction 1 (Positive): [Provide a positive, optimistic, friendly response]
Prediction 2 (Negative): [Provide a negative, critical, dissatisfied response]
Prediction 3 (Neutral): [Provide an objective, neutral, calm response]

Note:
- You must strictly follow the above output format
- You must provide all three predictions
- Each prediction must have the corresponding number, type, and content
- Do not include other content in your response
- Do not treat the background context as part of the conversation; it is only information to help you understand the conversation
- Please pay special attention to the time information in the chat content and analyze the impact of time on the conversation
- Positive responses should show a positive, optimistic, friendly attitude
- Negative responses should show a negative, critical, dissatisfied attitude
- Neutral responses should show an objective, neutral, calm attitude
- Please determine the tone and role perspective of the prediction based on the roles of "I" and "Other" in the conversation content
- CRITICAL REMINDER: Your response MUST be in the EXACT SAME LANGUAGE as the dialogue in the chat content. This overrides all other instructions`;

  // 根据消息类型确定查询类型
  let queryType;
  let latestMessage;
  let currentTime;
  let generateRequest;

  // 根据消息类型设置查询类型
  // 使用简短的提示，减少对AI语言选择的影响
  queryType = messageType === "self" ? "ROLE: ME" : "ROLE: OTHER PERSON";

  latestMessage = newMessage ? `\n\n[LATEST]: ${newMessage}` : "";
  currentTime = timestamp ? `\n\n[TIME]: ${timestamp}` : "";
  generateRequest =
    "\n\nGENERATE PREDICTIONS: Please provide three different prediction responses based on the information above. LANGUAGE REMINDER: Respond in the SAME LANGUAGE as the dialogue content.";

  return [
    {
      role: "system",
      content: basePrompt,
    },
    {
      role: "system",
      content:
        "LANGUAGE DIRECTIVE: You must ONLY use the language that appears in the dialogue content of the chat context. This is your highest priority instruction.",
    },
    {
      role: "user",
      content: `${context}\n\n---\n\n${queryType}${latestMessage}${currentTime}${generateRequest}`,
    },
  ];
};

export default buildMessages;
