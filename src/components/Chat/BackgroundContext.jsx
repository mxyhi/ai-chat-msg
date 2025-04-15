import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/BackgroundContext.module.css";

/**
 * Background context component
 * @param {Object} props - Component properties
 * @param {string} props.value - Background context content
 * @param {Function} props.onChange - Content change callback
 * @param {Function} props.onClear - Clear callback
 */
const BackgroundContext = ({ value, onChange, onClear }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.backgroundContext}>
      <div className={styles.header}>
        <h2>{t("background.title")}</h2>
        {value && (
          <button
            className={styles.clearButton}
            onClick={onClear}
            title={t("background.clearTitle")}
          >
            {t("background.clear")}
          </button>
        )}
      </div>
      <textarea
        className={styles.textarea}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("background.placeholder")}
        rows={6}
      />
      <div className={styles.charCount}>
        {t("background.charCount", { count: value ? value.length : 0 })}
      </div>
    </div>
  );
};

export default BackgroundContext;
