import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/MessageTypeSelector.module.css";
import { MESSAGE_TYPES } from "../../constants";

/**
 * Message type selector component
 * @param {Object} props - Component properties
 * @param {string} props.messageType - Currently selected message type
 * @param {Function} props.onChange - Type change callback function
 */
const MessageTypeSelector = ({ messageType, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.messageTypeSelector}>
      <label
        className={messageType === MESSAGE_TYPES.SELF ? styles.selected : ""}
      >
        <input
          type="radio"
          name="messageType"
          value={MESSAGE_TYPES.SELF}
          checked={messageType === MESSAGE_TYPES.SELF}
          onChange={() => onChange(MESSAGE_TYPES.SELF)}
        />
        <span className={styles.radioIcon}>👤</span>{" "}
        {t("prediction.types.self")}
      </label>
      <label
        className={messageType === MESSAGE_TYPES.OTHER ? styles.selected : ""}
      >
        <input
          type="radio"
          name="messageType"
          value={MESSAGE_TYPES.OTHER}
          checked={messageType === MESSAGE_TYPES.OTHER}
          onChange={() => onChange(MESSAGE_TYPES.OTHER)}
        />
        <span className={styles.radioIcon}>👥</span>{" "}
        {t("prediction.types.other")}
      </label>
    </div>
  );
};

export default MessageTypeSelector;
