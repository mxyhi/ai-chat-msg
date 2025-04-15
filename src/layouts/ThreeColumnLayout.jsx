import React from "react";
import styles from "./styles/ThreeColumnLayout.module.css";
import LeftColumn from "../components/Layout/LeftColumn";
import MiddleColumn from "../components/Layout/MiddleColumn";
import RightColumn from "../components/Layout/RightColumn";
import LayoutFooter from "../components/Layout/LayoutFooter";

/**
 * 三列布局组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.leftColumn - 左侧列内容（配置和背景上下文）
 * @param {React.ReactNode} props.middleColumn - 中间列内容（聊天上下文）
 * @param {React.ReactNode} props.rightColumn - 右侧列内容（预测结果）
 * @param {React.ReactNode} props.footer - 底部内容
 */
const ThreeColumnLayout = ({
  leftColumn,
  middleColumn,
  rightColumn,
  footer,
}) => {
  return (
    <div className={styles.threeColumnLayout}>
      <LeftColumn>{leftColumn}</LeftColumn>
      <MiddleColumn>{middleColumn}</MiddleColumn>
      <RightColumn>{rightColumn}</RightColumn>
      {footer && <LayoutFooter>{footer}</LayoutFooter>}
    </div>
  );
};

export default ThreeColumnLayout;
