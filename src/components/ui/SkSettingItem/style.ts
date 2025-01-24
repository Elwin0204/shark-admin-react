import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { darkMode } = token;
  const labelColor = darkMode ? "color: rgba(255, 255, 255, 0.85);" : "color: rgba(0, 0, 0, 0.88);";
  return {
    skSettingItemLabel: css`
      ${labelColor};
    `,
  }
})