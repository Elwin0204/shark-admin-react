import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseHeaderHeight } = token;
  return {
    horizontalMenu: css`
      line-height: ${baseHeaderHeight}px;
    `,
    mixMenuItemLabel: css`
      font-size: 12px;
      padding-top: 4px;
      height: 24px;
    `,
    mixMenuItem: css`
      margin: 0 4px 6px;
      border-radius: 8px;
      background-color: transparent;
      padding: 8px 4px;
      &:hover {
        background: rgba(0, 0, 0, 0.08);
      }
    `
  }
})