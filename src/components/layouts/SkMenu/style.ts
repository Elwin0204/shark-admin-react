import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseHeaderHeight } = token;
  return {
    horizontalMenu: css`
      line-height: ${baseHeaderHeight}px;
    `,
  }
})