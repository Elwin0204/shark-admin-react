import { createStyles } from 'antd-style'

export default createStyles(({ token, css }) => {
  const { baseSidebarWidth, baseSidebarCollapseWidth, baseHeaderZindex, baseHeaderHeight, baseTabsBarHeight, baseTabsBarZindex, baseSideBarZindex, baseFooterZindex, baseFooterHeight } = token;
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
    leftGap: css`
      padding-left: ${baseSidebarWidth}px;
    `,
    leftGapCollapse: css`
      padding-left: ${baseSidebarCollapseWidth}px;
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