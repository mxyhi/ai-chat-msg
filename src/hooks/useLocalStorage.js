import { useState, useEffect } from "react";

/**
 * 自定义钩子，用于在localStorage中存储和检索数据
 * @param {string} key - 存储键
 * @param {any} initialValue - 初始值
 * @returns {Array} - [storedValue, setValue] 存储的值和设置值的函数
 */
export const useLocalStorage = (key, initialValue) => {
  // 获取初始值
  const readValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 状态用于跟踪存储的值
  const [storedValue, setStoredValue] = useState(readValue);

  // 返回一个包装版本的useState的setter函数，将新值保存到sessionStorage
  const setValue = (value) => {
    try {
      // 允许值是一个函数，就像useState的setter
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // 保存state
      setStoredValue(valueToStore);

      // 保存到localStorage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // 监听存储事件，以便在其他窗口更改时更新
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
      }
    };

    // 添加事件监听器
    window.addEventListener("storage", handleStorageChange);

    // 清理
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
};

export default useLocalStorage;

// 为了兼容性，保留useSessionStorage别名
export const useSessionStorage = useLocalStorage;
