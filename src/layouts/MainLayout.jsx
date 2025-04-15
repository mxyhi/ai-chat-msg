import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/MainLayout.module.css";
import LanguageSwitcher from "../components/Common/LanguageSwitcher";

/**
 * Main layout component
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.modelName - Model name
 */
const MainLayout = ({ children, modelName }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`${styles.appContainer} ${fadeIn ? styles.fadeIn : ""}`}>
      <div className={styles.header}>
        <h1>
          <span className={styles.icon}>✨</span>
          {t("app.title")}
          <span className={styles.icon}>✨</span>
        </h1>
        <LanguageSwitcher />
      </div>

      {children}

      <footer className={styles.appFooter}>
        <p style={{ margin: 0, padding: 0 }}>
          {t("app.footer", { modelName })}
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
