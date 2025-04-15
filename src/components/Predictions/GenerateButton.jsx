import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/GenerateButton.module.css";

/**
 * Generate prediction button component
 * @param {Object} props - Component properties
 * @param {Function} props.onGenerate - Generate prediction callback
 * @param {boolean} props.loading - Whether loading
 * @param {boolean} props.disabled - Whether to disable the generate button
 */
const GenerateButton = ({ onGenerate, loading, disabled }) => {
  const { t } = useTranslation();

  return (
    <button
      className={`${styles.generateButton} ${loading ? styles.loading : ""}`}
      onClick={onGenerate}
      disabled={loading || disabled}
    >
      {loading ? t("prediction.generating") : `✨ ${t("prediction.generate")}`}
    </button>
  );
};

export default GenerateButton;
