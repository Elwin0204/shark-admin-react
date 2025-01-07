import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseSidebarWidth, baseTabsBarHeight, baseTabsBarZindex, baseHeaderHeight } = token;
  return {
    appTabsBar: css`
      padding-left: ${baseSidebarWidth}px;
      z-index: ${baseTabsBarZindex};
      height: ${baseTabsBarHeight}px;
      position: absolute;
      left: 0;
      top: ${baseHeaderHeight}px;
    `,
    appTabsBarPlacement: css`
      height: ${baseTabsBarHeight}px;
    `
  }
})