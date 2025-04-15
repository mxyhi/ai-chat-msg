import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/ModelSelector.module.css";
import { getAvailableModels } from "../../api";
import ModelSelectorInput from "./ModelSelectorInput";
import ModelDropdown from "./ModelDropdown";
import SelectedModelDisplay from "./SelectedModelDisplay";
import { API_CONFIG } from "../../constants";
import {
  DEFAULT_MODELS,
  filterModels,
  ensureHighlightedVisible,
} from "./ModelSelectorUtils";

/**
 * 模型选择器组件
 * @param {Object} props - 组件属性
 * @param {string} props.value - 当前选中的模型ID
 * @param {Function} props.onChange - 选择变更回调函数
 * @param {Object} props.apiConfig - API配置
 */
const ModelSelector = ({ value, onChange, apiConfig }) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // 从/model路径获取模型列表
  useEffect(() => {
    // 防抖处理，避免频繁请求
    let isMounted = true;

    // 如果没有API密钥，直接设置为非加载状态
    if (
      !apiConfig.apiKey &&
      !import.meta.env.VITE_OPENROUTER_API_KEY &&
      !API_CONFIG.DEFAULT_API_KEY
    ) {
      setLoading(false);
      // 使用默认模型列表
      setModels(DEFAULT_MODELS);
      return;
    }

    const fetchModels = async () => {
      // 避免重复加载
      if (loading) {
        return;
      }

      setLoading(true);
      try {
        console.log("请求模型列表...");
        const modelList = await getAvailableModels(apiConfig);
        if (isMounted) {
          if (modelList && modelList.length > 0) {
            setModels(modelList);
          } else {
            // 如果返回空列表，使用默认模型
            setModels(DEFAULT_MODELS);
          }
        }
      } catch (error) {
        console.error("获取模型列表失败:", error);
        if (isMounted) {
          // 出错时使用默认模型列表
          setModels(DEFAULT_MODELS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // 使用延时执行，避免频繁请求
    const timeoutId = setTimeout(fetchModels, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [apiConfig.apiKey, apiConfig.apiUrl]); // 移除loading依赖项，避免无限循环

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 处理模型选择
  const handleSelectModel = (modelId) => {
    onChange(modelId);
    setIsOpen(false);
    setInputValue("");
    setHighlightedIndex(-1);
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // 处理输入变化
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setHighlightedIndex(-1);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  // 处理输入框按键事件
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredModels.length) {
        // 选择高亮的模型
        handleSelectModel(filteredModels[highlightedIndex].id);
      } else if (inputValue.trim()) {
        // 使用当前输入作为自定义模型ID
        handleSelectModel(inputValue.trim());
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredModels.length - 1 ? prev + 1 : prev
      );
      handleEnsureHighlightedVisible();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      handleEnsureHighlightedVisible();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setIsFocused(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  // 确保高亮项在可视区域内
  const handleEnsureHighlightedVisible = () => {
    ensureHighlightedVisible(listRef, highlightedIndex);
  };

  // 处理使用自定义模型ID
  const handleUseCustomModel = () => {
    if (inputValue.trim()) {
      handleSelectModel(inputValue.trim());
    }
  };

  // 过滤模型列表
  const filteredModels = filterModels(models, inputValue);

  // 当下拉框打开时，聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 处理模型项鼠标悬停
  const handleModelItemMouseEnter = (index) => {
    setHighlightedIndex(index);
  };

  // 处理输入框聚焦
  const handleInputFocus = () => {
    setIsFocused(true);
    // 确保下拉列表打开
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  // 获取当前选中模型的名称
  const selectedModelName = value
    ? models.find((m) => m.id === value)?.name || value
    : "选择模型";

  // 处理选中模型显示点击
  const handleSelectedModelClick = () => {
    setIsFocused(true);
    setIsOpen(true); // 同时打开下拉列表
    if (inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  // 处理切换下拉框
  const handleToggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    setIsFocused(true);
    if (newIsOpen && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  return (
    <div className={styles.modelSelector} ref={dropdownRef}>
      <div
        className={`${styles.modelInputContainer} ${
          isFocused ? styles.focused : ""
        }`}
      >
        {!isFocused && !isOpen && value ? (
          <SelectedModelDisplay
            value={value}
            models={models}
            onClick={handleSelectedModelClick}
          />
        ) : (
          <ModelSelectorInput
            inputValue={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={handleInputFocus}
            placeholder={value || "搜索或输入模型ID..."}
            inputRef={inputRef}
            isOpen={isOpen}
            toggleDropdown={handleToggleDropdown}
            handleUseCustomModel={handleUseCustomModel}
          />
        )}
      </div>

      {isOpen && (
        <ModelDropdown
          filteredModels={filteredModels}
          value={value}
          highlightedIndex={highlightedIndex}
          onSelect={handleSelectModel}
          onMouseEnter={handleModelItemMouseEnter}
          listRef={listRef}
          loading={loading}
          inputValue={inputValue}
          hasApiKey={
            !!apiConfig.apiKey ||
            !!import.meta.env.VITE_OPENROUTER_API_KEY ||
            !!API_CONFIG.DEFAULT_API_KEY
          }
        />
      )}
    </div>
  );
};

export default ModelSelector;
