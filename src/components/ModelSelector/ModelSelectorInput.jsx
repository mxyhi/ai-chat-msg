import React from "react";
import styles from "./styles/ModelSelector.module.css";

/**
 * 模型选择器输入组件
 * @param {Object} props - 组件属性
 * @param {string} props.inputValue - 输入值
 * @param {Function} props.onChange - 变更回调
 * @param {Function} props.onKeyDown - 按键回调
 * @param {Function} props.onFocus - 聚焦回调
 * @param {string} props.placeholder - 占位符
 * @param {Object} props.inputRef - 输入框引用
 * @param {boolean} props.isOpen - 是否打开
 * @param {Function} props.toggleDropdown - 切换下拉框
 * @param {Function} props.handleUseCustomModel - 使用自定义模型
 */
const ModelSelectorInput = ({
  inputValue,
  onChange,
  onKeyDown,
  onFocus,
  placeholder,
  inputRef,
  isOpen,
  toggleDropdown,
  handleUseCustomModel,
}) => {
  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder={placeholder}
        className={styles.modelInput}
      />
      <span className={styles.dropdownToggle} onClick={toggleDropdown}>
        {isOpen ? "▲" : "▼"}
      </span>
      {inputValue.trim() && (
        <button
          className={styles.useCustomButton}
          onClick={handleUseCustomModel}
          title="使用此模型ID"
        >
          使用
        </button>
      )}
    </>
  );
};

export default ModelSelectorInput;
