import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseSidebarWidth, darkMode } = token;
  const boxShadow = darkMode ? "box-shadow: 0 1px 2px rgba(69, 72, 79, 0.63);" : "box-shadow: 0 1px 2px rgba(0, 21, 41, 0.08);";
  return {
    appHeader: css`
      padding-left: 12px;
      padding-right: 48px;
      ${boxShadow};
    `,
    logoWidth: css`
      width: ${baseSidebarWidth}px;
    `
  }
})