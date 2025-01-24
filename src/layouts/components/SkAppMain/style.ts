import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { darkMode, baseMainPadding } = token
  const contentBg = darkMode ? css`background: rgba(18, 18, 18, 1);` : css`background: rgba(255, 255, 255, 1);`
  return {
    appMainPadding: css`
      padding: ${baseMainPadding}px;
    `,
    appMainBg: css`${contentBg};`
  }
})