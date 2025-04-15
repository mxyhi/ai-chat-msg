import * as openRouterApi from "../services/openRouter";

export const openRouter = openRouterApi;
export const {
  generatePredictions,
  generatePredictionsStream,
  getAvailableModels,
} = openRouterApi;

// 如果将来添加其他API服务，可以在这里导出
// export const anotherApi = ...

export default {
  openRouter,
  generatePredictions,
  generatePredictionsStream,
  getAvailableModels,
};
