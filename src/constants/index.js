// Message types
export const MESSAGE_TYPES = {
  SELF: "self", // Predict my response
  OTHER: "other", // Predict other's response
};

// API related configuration
export const API_CONFIG = {
  MODELS: {
    GPT_3_5: "openai/gpt-3.5-turbo",
    GPT_4: "openai/gpt-4",
    CLAUDE_3_OPUS: "anthropic/claude-3-opus",
    CLAUDE_3_SONNET: "anthropic/claude-3-sonnet",
    CLAUDE_3_7_SONNET: "anthropic/claude-3.7-sonnet",
    CLAUDE_3_HAIKU: "anthropic/claude-3-haiku",
    GEMINI_PRO: "google/gemini-pro",
    LLAMA_3_70B: "meta-llama/llama-3-70b-instruct",
    DEEPSEEK_R1: "deepseek/deepseek-coder-v2",
    DEEPSEEK_R1_INSTRUCT: "deepseek/deepseek-coder-v2-instruct",
  },
  DEFAULT_MODELS: [
    { value: "openai/gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "openai/gpt-4", label: "GPT-4" },
    { value: "anthropic/claude-3-opus", label: "Claude 3 Opus" },
    { value: "anthropic/claude-3-sonnet", label: "Claude 3 Sonnet" },
    { value: "anthropic/claude-3.7-sonnet", label: "Claude 3.7 Sonnet" },
    { value: "anthropic/claude-3-haiku", label: "Claude 3 Haiku" },
    { value: "google/gemini-pro", label: "Gemini Pro" },
    { value: "meta-llama/llama-3-70b-instruct", label: "Llama 3 70B" },
    { value: "deepseek/deepseek-coder-v2", label: "DeepSeek R1" },
    {
      value: "deepseek/deepseek-coder-v2-instruct",
      label: "DeepSeek R1 Instruct",
    },
  ],
  DEFAULT_API_KEY: "",
  DEFAULT_MODEL: "anthropic/claude-3.7-sonnet",
  DEFAULT_API_URL: "https://openrouter.ai/api/v1",
  PREDICTION_COUNT: 3, // Generate three predictions (positive, negative, neutral)
  TEMPERATURE: 1,
};

// Local storage keys
export const STORAGE_KEYS = {
  API_CONFIG: "ai_chat_predictor_api_config",
  CHAT_MESSAGES: "ai_chat_predictor_messages",
  BACKGROUND_CONTEXT: "ai_chat_predictor_background_context",
  MESSAGE_TYPE: "ai_chat_predictor_message_type",
  LANGUAGE: "ai_chat_predictor_language",
};
