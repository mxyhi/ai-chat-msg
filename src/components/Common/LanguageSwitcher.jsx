import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/LanguageSwitcher.module.css";

/**
 * Language switcher component
 * Allows users to switch between available languages
 */
const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={`${styles.languageButton} ${
          i18n.language === "en" ? styles.active : ""
        }`}
        onClick={() => changeLanguage("en")}
        title={t("language.en")}
      >
        EN
      </button>
      <button
        className={`${styles.languageButton} ${
          i18n.language === "zh" ? styles.active : ""
        }`}
        onClick={() => changeLanguage("zh")}
        title={t("language.zh")}
      >
        中
      </button>
    </div>
  );
};

export default LanguageSwitcher;
