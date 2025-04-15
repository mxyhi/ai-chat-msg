import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles/ReasoningProcess.module.css";

/**
 * Reasoning process component
 * @param {Object} props - Component properties
 * @param {string} props.reasoning - Reasoning process content
 * @param {boolean} props.streaming - Whether streaming output
 */
const ReasoningProcess = ({ reasoning, streaming }) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);
  const { t } = useTranslation();

  // If there's no reasoning process, don't display
  if (!reasoning) {
    return null;
  }

  // Auto-scroll to bottom when reasoning content updates or streaming status changes
  useEffect(() => {
    if (expanded && streaming && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [reasoning, streaming, expanded]);

  return (
    <div className={styles.reasoningSection}>
      <div
        className={styles.reasoningHeader}
        onClick={() => setExpanded(!expanded)}
      >
        <h3>
          {t("reasoning.title")}
          {streaming && (
            <span className={styles.streamingIndicator}>
              {t("reasoning.thinking")}
            </span>
          )}
        </h3>
        <span className={styles.toggleIcon}>{expanded ? "▼" : "▶"}</span>
      </div>

      {expanded && (
        <div
          ref={contentRef}
          className={`${styles.reasoningContent} ${
            streaming ? styles.typing : ""
          }`}
        >
          {reasoning || (streaming ? " " : t("reasoning.empty"))}
        </div>
      )}
    </div>
  );
};

export default ReasoningProcess;
