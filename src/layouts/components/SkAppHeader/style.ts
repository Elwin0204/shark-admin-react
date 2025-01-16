import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseSidebarWidth } = token;
  return {
    appHeader: css`
      padding-left: 12px;
      padding-right: 48px;
      box-shadow: 0 1px 2px rgba(0, 21, 41, 0.08);
    `,
    logoWidth: css`
      width: ${baseSidebarWidth}px;
    `
  }
})