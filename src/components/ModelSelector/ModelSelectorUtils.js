// 默认模型列表
export const DEFAULT_MODELS = [
  { id: "openai/gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "openai" },
  { id: "openai/gpt-4", name: "GPT-4", provider: "openai" },
  {
    id: "anthropic/claude-3-opus",
    name: "Claude 3 Opus",
    provider: "anthropic",
  },
  {
    id: "anthropic/claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "anthropic",
  },
  {
    id: "anthropic/claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "anthropic",
  },
  {
    id: "anthropic/claude-3.7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "anthropic",
  },
  { id: "google/gemini-pro", name: "Gemini Pro", provider: "google" },
  {
    id: "meta-llama/llama-3-70b-instruct",
    name: "Llama 3 70B",
    provider: "meta",
  },
  {
    id: "deepseek/deepseek-coder-v2",
    name: "DeepSeek R1",
    provider: "deepseek",
  },
  {
    id: "deepseek/deepseek-coder-v2-instruct",
    name: "DeepSeek R1 Instruct",
    provider: "deepseek",
  },
];

/**
 * 过滤模型列表
 * @param {Array} models - 模型列表
 * @param {string} inputValue - 输入值
 * @returns {Array} - 过滤后的模型列表
 */
export const filterModels = (models, inputValue) => {
  return models.filter(
    (model) =>
      model.id.toLowerCase().includes(inputValue.toLowerCase()) ||
      model.name.toLowerCase().includes(inputValue.toLowerCase())
  );
};

/**
 * 确保高亮项在可视区域内
 * @param {Object} listRef - 列表引用
 * @param {number} highlightedIndex - 高亮索引
 */
export const ensureHighlightedVisible = (listRef, highlightedIndex) => {
  if (listRef.current && highlightedIndex >= 0) {
    setTimeout(() => {
      const highlightedEl = listRef.current.querySelector(`.highlighted`);
      if (highlightedEl) {
        highlightedEl.scrollIntoView({ block: "nearest" });
      }
    }, 0);
  }
};

export default {
  DEFAULT_MODELS,
  filterModels,
  ensureHighlightedVisible
};
