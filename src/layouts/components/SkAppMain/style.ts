import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseAppMainContainerHeight } = token
  return {
    appMainContainer: css`
      position: relative;
      width: 100%;
      height: ${baseAppMainContainerHeight()};
      overflow: auto;
    `,
  }
})