import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  return {
    testIndex: css`
      width: 100px;
      height: 100px;
      background: ${token.colorPrimaryBg};
      color: ${token.colorPrimary};
    `,
  }
})