import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseMenuBackground, baseSidebarWidth, baseTransitionTime } = token
  return {
    sideBarContainer: css`
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${baseSidebarWidth}px;
      height: 100vh;
      overflow: hidden;
      background-color: ${baseMenuBackground};
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
      transition: width ${baseTransitionTime};
    `,
  }
})