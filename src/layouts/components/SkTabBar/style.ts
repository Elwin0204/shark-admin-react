import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  return {
    appTabBar: css`
      padding-left: 16px;
      padding-right: 16px;
      box-shadow: 0 1px 2px rgba(0, 21, 41, 0.08);
    `,
  }
})