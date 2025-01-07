import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseSidebarWidth, baseHeaderZindex, baseHeaderHeight } = token;
  return {
    appHeader: css`
      padding-left: ${baseSidebarWidth}px;
      z-index: ${baseHeaderZindex};
      height: ${baseHeaderHeight}px;
      position: absolute;
      left: 0;
      top: 0;
    `,
    appHeaderPlacement: css`
      height: ${baseHeaderHeight}px;
    `
  }
})