import React from "react";
import styles from "./styles/LayoutFooter.module.css";

/**
 * 布局页脚组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 */
const LayoutFooter = ({ children }) => {
  return <div className={styles.layoutFooter}>{children}</div>;
};

export default LayoutFooter;
