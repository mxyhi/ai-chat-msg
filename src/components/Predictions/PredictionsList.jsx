import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/PredictionsList.module.css";
import PredictionItem from "./PredictionItem";
import ReasoningProcess from "./ReasoningProcess";

/**
 * Prediction results list component
 * @param {Object} props - Component properties
 * @param {Array<Object>} props.predictions - Prediction results array
 * @param {boolean} props.streaming - Whether streaming output
 * @param {string} props.timestamp - Prediction generation timestamp
 */
const PredictionsList = ({ predictions, streaming, timestamp }) => {
  const { t } = useTranslation();
  // 如果没有预测结果且不是流式输出状态，则不显示
  if (!predictions || (predictions.length === 0 && !streaming)) {
    return null;
  }

  // 提取推理过程（如果存在）
  let reasoning = "";
  if (
    predictions.length > 0 &&
    typeof predictions[0] === "object" &&
    predictions[0] !== null
  ) {
    reasoning = predictions[0].reasoning || "";
  }

  // 处理预测结果，只显示文本部分
  const processedPredictions = predictions.map((prediction) => {
    if (typeof prediction === "object" && prediction !== null) {
      return prediction.text;
    }
    return prediction;
  });

  // 如果是流式输出状态但没有预测结果，则显示占位符
  // 显示所有预测结果
  const displayPredictions =
    processedPredictions.length > 0
      ? processedPredictions // 显示所有预测
      : streaming
      ? ["", "", ""]
      : [];

  return (
    <div className={styles.predictionsSection}>
      <h2>
        {t("prediction.results")}
        {streaming && (
          <span className={styles.streamingIndicator}>
            {t("prediction.streaming")}
          </span>
        )}
      </h2>

      <div className={styles.scrollableContent}>
        {/* 只在有推理内容时才显示推理过程 */}
        {reasoning && (
          <ReasoningProcess reasoning={reasoning} streaming={streaming} />
        )}

        <div className={styles.predictionsList}>
          {displayPredictions.map((prediction, index) => (
            <PredictionItem
              key={index}
              prediction={prediction}
              index={index}
              streaming={streaming}
              timestamp={timestamp}
              isLast={index === displayPredictions.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionsList;
