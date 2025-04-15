import axios from "axios";
import { API_CONFIG } from "../../constants";

/**
 * 创建API客户端
 * @param {Object} config - API配置
 * @returns {Object} - axios实例
 */
export const createApiClient = (config) => {
  return axios.create({
    baseURL: config.apiUrl || API_CONFIG.DEFAULT_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        config.apiKey ||
        import.meta.env.VITE_OPENROUTER_API_KEY ||
        API_CONFIG.DEFAULT_API_KEY ||
        ""
      }`,
    },
  });
};

export default createApiClient;
