import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseHeaderHeight } = token;
  return {
    skLogoTitle: css`
      padding-left: 8px;
      font-size: 16px;
      font-weight: 700;
    `,
    skLogoImage: css`
      width: 32px;
      height: 32px;
    `,
    skLogoWrapper: css`
      height: ${baseHeaderHeight}px;
      color: inherit;
      text-decoration: none;
      background-color: transparent;
      outline: none;
    `
  }
})