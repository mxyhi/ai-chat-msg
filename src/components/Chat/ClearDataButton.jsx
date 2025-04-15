import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/ClearDataButton.module.css";

/**
 * Clear data button component
 * @param {Object} props - Component properties
 * @param {Function} props.onClearAll - Clear all data callback
 */
const ClearDataButton = ({ onClearAll }) => {
  const [confirming, setConfirming] = useState(false);
  const { t } = useTranslation();

  const handleClearClick = () => {
    if (confirming) {
      onClearAll();
      setConfirming(false);
    } else {
      setConfirming(true);
      // Auto-cancel confirmation status after 5 seconds
      setTimeout(() => setConfirming(false), 5000);
    }
  };

  return (
    <span
      className={`${styles.clearAllButton} ${
        confirming ? styles.confirming : ""
      }`}
      onClick={handleClearClick}
    >
      {confirming ? t("clearData.confirm") : t("clearData.button")}
    </span>
  );
};

export default ClearDataButton;
