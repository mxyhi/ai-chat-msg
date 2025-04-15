import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/ApiConfigContainer.module.css";

/**
 * API configuration container component
 * @param {Object} props - Component properties
 * @param {Object} props.config - API configuration
 * @param {Function} props.onSave - Save configuration callback
 * @param {boolean} props.showConfig - Whether to show configuration
 * @param {Function} props.setShowConfig - Set show configuration state callback
 */
const ApiConfigContainer = ({ config, onSave, showConfig, setShowConfig }) => {
  const { t } = useTranslation();
  const [localConfig, setLocalConfig] = React.useState({
    apiKey: config.apiKey || "",
    apiUrl: config.apiUrl || "",
    model: config.model || "",
  });

  // Update local state when configuration changes
  React.useEffect(() => {
    setLocalConfig({
      apiKey: config.apiKey || "",
      apiUrl: config.apiUrl || "",
      model: config.model || "",
    });
  }, [config]);

  const handleSave = () => {
    onSave(localConfig);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <button
        className={styles.configButton}
        onClick={() => setShowConfig(!showConfig)}
        title={t("config.title")}
      >
        ⚙️
      </button>

      {showConfig && (
        <div className={styles.configOverlay}>
          <div className={styles.configPanel}>
            <h2>{t("config.title")}</h2>
            <div className={styles.configForm}>
              <div className={styles.formGroup}>
                <label htmlFor="apiKey">{t("config.apiKey")}</label>
                <input
                  type="password"
                  id="apiKey"
                  name="apiKey"
                  value={localConfig.apiKey}
                  onChange={handleChange}
                  placeholder={t("config.placeholder.apiKey")}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="apiUrl">{t("config.apiUrl")}</label>
                <input
                  type="text"
                  id="apiUrl"
                  name="apiUrl"
                  value={localConfig.apiUrl}
                  onChange={handleChange}
                  placeholder={t("config.placeholder.apiUrl")}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="model">{t("config.model")}</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={localConfig.model}
                  onChange={handleChange}
                  placeholder={t("config.placeholder.model")}
                />
              </div>
              <div className={styles.formActions}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowConfig(false)}
                >
                  {t("config.cancel")}
                </button>
                <button className={styles.saveButton} onClick={handleSave}>
                  {t("config.save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApiConfigContainer;
