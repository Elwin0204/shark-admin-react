import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseSidebarWidth, baseSidebarCollapseWidth, baseSidebarMixWidth, baseHeaderZindex, baseHeaderHeight, baseTabsBarHeight, baseTabsBarZindex, baseSideBarZindex, baseFooterZindex, baseFooterHeight } = token;
  return {
    appHeader: css`
      z-index: ${baseHeaderZindex};
      height: ${baseHeaderHeight}px;
      position: absolute;
      left: 0;
      top: 0;
    `,
    appHeaderPlacement: css`
      height: ${baseHeaderHeight}px;
    `,
    appTabsBar: css`
      z-index: ${baseTabsBarZindex};
      height: ${baseTabsBarHeight}px;
      position: absolute;
      left: 0;
      top: ${baseHeaderHeight}px;
    `,
    appTabsBarPlacement: css`
      height: ${baseTabsBarHeight}px;
    `,
    appSideBar: css`
      z-index: ${baseSideBarZindex};
      position: absolute;
      left: 0;
      top: 0;
    `,
    appMain: css`
      
    `,
    sidebarWidth: css`
      width: ${baseSidebarWidth}px;
    `,
    sidebarCollapseWidth: css`
      width: ${baseSidebarCollapseWidth}px;
    `,
    sidebarMixWidth: css`
      width: ${baseSidebarMixWidth}px;
    `,
    sidebarPaddingTop: css`
      padding-top: ${baseHeaderHeight}px;
    `,
    leftGap: css`
      padding-left: ${baseSidebarWidth}px;
    `,
    leftGapCollapse: css`
      padding-left: ${baseSidebarCollapseWidth}px;
    `,
    leftGapMix: css`
      padding-left: ${baseSidebarMixWidth}px;
    `,
    appFooter: css`
      z-index: ${baseFooterZindex};
      height: ${baseFooterHeight}px;
    `,
    appFooterPlacement: css`
      height: ${baseFooterHeight}px;
    `,
  }
})