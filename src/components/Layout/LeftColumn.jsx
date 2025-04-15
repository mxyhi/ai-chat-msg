import React from "react";
import styles from "./styles/LeftColumn.module.css";

/**
 * 左侧列组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 */
const LeftColumn = ({ children }) => {
  return <div className={styles.leftColumn}>{children}</div>;
};

export default LeftColumn;
