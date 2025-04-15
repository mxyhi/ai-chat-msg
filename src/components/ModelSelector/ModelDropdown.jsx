import React from "react";
import styles from "./styles/ModelSelector.module.css";

/**
 * 模型下拉列表组件
 * @param {Object} props - 组件属性
 * @param {Array} props.filteredModels - 过滤后的模型列表
 * @param {string} props.value - 当前选中的值
 * @param {number} props.highlightedIndex - 高亮索引
 * @param {Function} props.onSelect - 选择回调
 * @param {Function} props.onMouseEnter - 鼠标进入回调
 * @param {Object} props.listRef - 列表引用
 * @param {boolean} props.loading - 是否加载中
 * @param {string} props.inputValue - 输入值
 * @param {boolean} props.hasApiKey - 是否有API密钥
 */
const ModelDropdown = ({
  filteredModels,
  value,
  highlightedIndex,
  onSelect,
  onMouseEnter,
  listRef,
  loading,
  inputValue,
  hasApiKey,
}) => {
  return (
    <div className={styles.modelDropdown}>
      <div className={styles.modelsList} ref={listRef}>
        {loading ? (
          <div className={styles.loadingModels}>加载模型列表中...</div>
        ) : filteredModels.length > 0 ? (
          filteredModels.map((model, index) => (
            <div
              key={model.id}
              className={`${styles.modelItem} ${
                value === model.id ? styles.selected : ""
              } ${index === highlightedIndex ? styles.highlighted : ""}`}
              onClick={() => onSelect(model.id)}
              onMouseEnter={() => onMouseEnter(index)}
            >
              <div className={styles.modelId}>{model.id}</div>
              <div className={styles.modelName}>{model.name}</div>
            </div>
          ))
        ) : inputValue.trim() ? (
          <div className={styles.noResults}>
            <p>未找到匹配的模型</p>
            <p>按回车键使用 "{inputValue}" 作为自定义模型ID</p>
          </div>
        ) : !hasApiKey ? (
          <div className={styles.noResults}>
            <p>请先输入API密钥或选择默认模型</p>
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>开始输入以搜索模型或输入自定义模型ID</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelDropdown;
