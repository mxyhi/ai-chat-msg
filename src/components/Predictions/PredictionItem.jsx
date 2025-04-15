import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import styles from "./styles/PredictionItem.module.css";
import { copyToClipboard, message } from "../../utils";
import { PREDICTION_TYPES } from "../../services/openRouter/streamingUtils";

/**
 * Prediction result item component
 * @param {Object} props - Component properties
 * @param {string} props.prediction - Prediction content
 * @param {number} props.index - Prediction index
 * @param {boolean} props.streaming - Whether streaming output
 * @param {string} props.timestamp - Prediction generation timestamp
 */
const PredictionItem = ({
  prediction,
  index,
  streaming,
  timestamp,
  isLast,
}) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);
  const { t } = useTranslation();

  // 复制到剪贴板
  const handleCopy = async () => {
    try {
      const success = await copyToClipboard(prediction);
      if (success) {
        setCopied(true);
        // 尝试使用消息通知，如果失败则使用控制台输出
        try {
          message.success(t("prediction.copied"));
        } catch (msgError) {
          console.log("复制成功，但消息通知失败", msgError);
        }
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.warn("Copy failed");
        alert("Copy failed, please copy the text manually");
      }
    } catch (error) {
      console.error("Copy operation exception:", error);
      alert("Copy failed, please copy the text manually");
    }
  };

  // 添加打字机效果的闪烁光标
  useEffect(() => {
    if (streaming && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [prediction, streaming]);

  // 根据索引确定预测类型
  const getPredictionType = (idx) => {
    // 获取当前语言
    const currentLang = i18n.language || "en";
    // 选择对应语言的预测类型数组
    const types = PREDICTION_TYPES[currentLang === "zh" ? "zh" : "en"];

    if (idx >= 0 && idx < types.length) {
      // 根据索引确定样式类名
      let className = "";
      switch (idx) {
        case 0: // Positive/正向
          className = styles.positive;
          break;
        case 1: // Negative/负向
          className = styles.negative;
          break;
        case 2: // Neutral/中立
          className = styles.neutral;
          break;
      }

      return {
        text: t(
          `prediction.predictionTypes.${
            idx === 0 ? "positive" : idx === 1 ? "negative" : "neutral"
          }`
        ),
        className,
      };
    }

    return { text: "", className: "" };
  };

  const predictionType = getPredictionType(index);

  return (
    <div
      className={`${styles.predictionItem} ${predictionType.className} ${
        streaming ? styles.streaming : ""
      } ${isLast ? styles.lastItem : ""}`}
    >
      <h3>
        <span className={styles.predictionType}>{predictionType.text}</span>
        {timestamp && (
          <span className={styles.timestamp}>
            <span className={styles.timeIcon}>🕒</span> {timestamp}
          </span>
        )}
      </h3>
      <div
        ref={contentRef}
        className={`${styles.predictionContent} ${
          streaming ? styles.typing : ""
        }`}
      >
        {streaming
          ? prediction || " "
          : prediction && prediction.startsWith("[") && prediction.endsWith("]")
          ? prediction
          : prediction || t("prediction.waiting")}
      </div>
      <div className={styles.predictionActions}>
        <button
          className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
          onClick={handleCopy}
          disabled={!prediction}
          title={t("prediction.copyTitle")}
        >
          {copied ? t("prediction.copied") : t("prediction.copy")}
        </button>
      </div>
    </div>
  );
};

export default PredictionItem;
