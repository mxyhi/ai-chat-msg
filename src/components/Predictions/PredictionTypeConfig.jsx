import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/PredictionTypeConfig.module.css";
import MessageTypeSelector from "./MessageTypeSelector";
import GenerateButton from "./GenerateButton";

/**
 * Prediction type configuration component
 * @param {Object} props - Component properties
 * @param {string} props.messageType - Message type
 * @param {Function} props.onMessageTypeChange - Message type change callback
 * @param {Function} props.onGenerate - Generate prediction callback
 * @param {boolean} props.loading - Whether loading
 * @param {boolean} props.disabled - Whether to disable the generate button
 */
const PredictionTypeConfig = ({
  messageType,
  onMessageTypeChange,
  onGenerate,
  loading,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.predictionTypeSection}>
      <h2>{t("prediction.title")}</h2>
      <MessageTypeSelector
        messageType={messageType}
        onChange={onMessageTypeChange}
      />
      <GenerateButton
        onGenerate={onGenerate}
        loading={loading}
        disabled={disabled}
      />
    </div>
  );
};

export default PredictionTypeConfig;
