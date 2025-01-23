import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseSidebarWidth, baseSidebarCollapseWidth, baseSidebarMixWidth, baseSidebarVerticalMixWidth, baseHeaderZindex, baseHeaderHeight, baseTabsBarHeight, baseTabbarZindex, baseSideBarZindex, baseFooterZindex, baseFooterHeight } = token;
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
    appTabBar: css`
      z-index: ${baseTabbarZindex};
      height: ${baseTabsBarHeight}px;
      position: absolute;
      left: 0;
      top: ${baseHeaderHeight}px;
    `,
    appTabBarPlacement: css`
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
    sidebarVerticalMixWidth: css`
      width: ${baseSidebarVerticalMixWidth}px;
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
    leftGapVerticalMix: css`
      padding-left: ${baseSidebarVerticalMixWidth}px;
    `,
    appFooter: css`
      z-index: ${baseFooterZindex};
      height: ${baseFooterHeight}px;
      position: absolute;
      left: 0;
      bottom: 0;
    `,
    appFooterPlacement: css`
      height: ${baseFooterHeight}px;
    `,
  }
})