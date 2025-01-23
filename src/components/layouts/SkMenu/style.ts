import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseHeaderHeight, baseSidebarMixChildWidth } = token;
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
    `,
    verticalMixLogo: css`
      height: ${baseHeaderHeight}px;
    `,
    verticalMixChild: css`
      width: ${baseSidebarMixChildWidth}px;
    `,
    verticalMixChildZero: css`
      width: 0px;
    `,
    verticalMixDarkWrapper: css`
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: 0 0 rgba(0, 0, 0, 0);
    `,
    verticalMixHeader: css`
      height: ${baseHeaderHeight}px;
      padding: 0 12px;
    `,
    verticalMixHeaderTitle: css`
      font-size: 16px;
    `
  }
})