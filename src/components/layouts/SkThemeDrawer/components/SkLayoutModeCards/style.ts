import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { colorPrimary, colorPrimaryBgHover, colorPrimaryBg, darkMode } = token;
  const cardShadow = darkMode ? "box-shadow: 0 0 5px 1px rgba(107, 114, 128, 0.625);" : "box-shadow: 0 0 5px 1px rgba(0,0,0,0.15);";
  return {
    layoutCards: css`
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 8px 2px 0;
    `,
    layoutLeft: css`
      display: flex;
      justify-content: space-between;
    `,
    layoutDark: css`
      width: 20%;
    `,
    layoutContainer: css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 72%;
    `,
    layoutLight: css`
      height: 20%;
    `,
    layoutContent: css`
      height: 67%;
    `,
    layoutTop: css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `,
    layoutMix: css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `,
    layoutLeftmix: css`
      display: flex;
      justify-content: space-between;
    `,
    layoutDarkInLeft: css`
      width: 14%;
    `,
    layoutLightInLeftmix: css`
      width: 17px;
    `,
    layoutContentInLeftmix: css`
      width: 55%;
    `,
    layoutDarkInTop: css`
      height: 20%;
    `,
    layoutDarkInMix: css`
      height: 22%;
    `,
    layoutContainerInMix: css`
      display: flex;
      justify-content: space-between;
      height: 70%;
    `,
    layoutLightInMix: css`
      width: 20%;
    `,
    layoutContentInMix: css`
      width: 70%;
    `,
    layoutCard: css`
      position: relative;
      box-sizing: border-box;
      width: 100px;
      height: 70px;
      padding: 6px;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s;
      ${cardShadow};
      & .card-dark {
        background-color: ${colorPrimary}; 
        border-radius: 4px;
      }

      & .card-light {
        background-color: ${colorPrimaryBgHover};
        border-radius: 4px;
      }

      & .card-content {
        background-color: ${colorPrimaryBg};
        border: 1px dashed ${colorPrimary};
        border-radius: 4px;
      }
      &.is-active {
        box-shadow: 0 0 0 2px ${colorPrimary};
      }
    `,
    layoutCardMb: css`
      margin-bottom: 22px;
    `,
    layoutCardActive: css`
      box-shadow: 0 0 0 2px ${colorPrimary};
    `
  }
})