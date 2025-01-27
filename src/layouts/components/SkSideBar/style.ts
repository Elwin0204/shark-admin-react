import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { darkMode } = token;
  const boxShadow = darkMode ? "box-shadow: 1px 0 0px 0 rgba(69, 72, 79, 0.63);" : "box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);";
  return {
    sideBarContainer: css`
      ${boxShadow};
    `,
  }
})