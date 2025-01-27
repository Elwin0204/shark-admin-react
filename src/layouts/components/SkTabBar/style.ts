import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { darkMode } = token;
  const boxShadow = darkMode ? "box-shadow: 0 1px 2px rgba(69, 72, 79, 0.63);" : "box-shadow: 0 1px 2px rgba(0, 21, 41, 0.08);";
  return {
    appTabBar: css`
      padding-left: 16px;
      padding-right: 16px;
      ${boxShadow};
    `,
  }
})