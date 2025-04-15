import React from "react";
import styles from "./styles/MiddleColumn.module.css";

/**
 * 中间列组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 */
const MiddleColumn = ({ children }) => {
  return <div className={styles.middleColumn}>{children}</div>;
};

export default MiddleColumn;
