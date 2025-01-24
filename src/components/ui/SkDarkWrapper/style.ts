import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { darkMode } = token;
  const wrapperBg = darkMode ? css`background: rgba(28, 28, 28, 1);` : css`background: rgba(255, 255, 255, 1);`

  return {
    skDarkWrapper: css`
      ${wrapperBg};
    `,
    skInverted: css`
    
    `
  }
})