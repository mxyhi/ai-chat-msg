import React from "react";
import styles from "./styles/PredictionsContainer.module.css";
import PredictionsList from "./PredictionsList";

/**
 * 预测容器组件
 * @param {Object} props - 组件属性
 * @param {Array} props.predictions - 预测结果数组
 * @param {boolean} props.streaming - 是否正在流式输出
 * @param {boolean} props.loading - 是否正在加载
 * @param {boolean} props.disabled - 是否禁用
 * @param {string} props.timestamp - 预测生成的时间戳
 */
const PredictionsContainer = ({
  predictions,
  streaming,
  loading,
  disabled,
  timestamp,
}) => {
  return (
    <div className={styles.predictionsContainer}>
      <PredictionsList
        predictions={predictions}
        streaming={streaming}
        timestamp={timestamp}
      />
    </div>
  );
};

export default PredictionsContainer;
