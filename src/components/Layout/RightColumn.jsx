import React from "react";
import styles from "./styles/RightColumn.module.css";

/**
 * 右侧列组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 */
const RightColumn = ({ children }) => {
  return <div className={styles.rightColumn}>{children}</div>;
};

export default RightColumn;
