import React from "react";
import styles from "./styles/ModelSelector.module.css";

/**
 * 已选模型显示组件
 * @param {Object} props - 组件属性
 * @param {string} props.value - 当前选中的模型ID
 * @param {Array} props.models - 模型列表
 * @param {Function} props.onClick - 点击回调
 */
const SelectedModelDisplay = ({ value, models, onClick }) => {
  return (
    <div className={styles.selectedModelDisplayInline} onClick={onClick}>
      <div className={styles.selectedModelId}>{value}</div>
      {models.find((m) => m.id === value)?.name && (
        <div className={styles.selectedModelName}>
          {models.find((m) => m.id === value)?.name}
        </div>
      )}
    </div>
  );
};

export default SelectedModelDisplay;
