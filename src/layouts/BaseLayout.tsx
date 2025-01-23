import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";
import SkAppHeader from './components/SkAppHeader';
import SkTabsBar from "./components/SkTabsBar";
import SKSideBar from './components/SkSideBar';
import SkAppFooter from "./components/SkAppFooter";
import {
  Outlet,
} from 'react-router-dom';
import { useAppStore, useThemeStore } from '@/stores';
import { Suspense } from 'react';
import SkThemeDrawer from '@/components/layouts/SkThemeDrawer';
import SkMenu from '@/components/layouts/SkMenu';
import MenuProvider from '../providers/MenuProvider';

const BaseLayout: React.FC = () => {
  const { styles: baseStyles } = useBaseStyles();
  const { styles, cx } = useStyles();
  const { collapse, mixSidebarFixed } = useAppStore();
  const { layout, showBreadcrumb, showTabbar, showFooter } = useThemeStore();
  const { childLevelMenus } = useMixMenuContext();
  const hasChild = childLevelMenus && childLevelMenus.length > 0;
  const sidebarWidth = getSidebarWidth();
  const sidebarPadding = layout === "horizontal-mix" ? styles.sidebarPaddingTop : "";
  const sidebarVisible = layout !== "horizontal";
  const leftGap = getLeftGap();
  const headerLeftGap = layout === "horizontal-mix" ? "" : leftGap;
  const showLogo = layout !== "horizontal-mix" && layout !== "vertical-mix";

  function getSidebarWidth() {
    if(layout === "horizontal-mix") {
      return styles.sidebarMixWidth;
    } else if(layout === "vertical-mix") {
      if(mixSidebarFixed && hasChild) return styles.sidebarVerticalMixWidth;
      return styles.sidebarMixWidth;
    }
    return collapse ? styles.sidebarCollapseWidth : styles.sidebarWidth;
  }

  function getLeftGap() {
    if(layout === "horizontal-mix") {
      return styles.leftGapMix;
    } else if(layout === "vertical-mix") {
      if(mixSidebarFixed && hasChild) return styles.leftGapVerticalMix;
      return styles.leftGapMix;
    }
    return sidebarVisible ? collapse ? styles.leftGapCollapse : styles.leftGap : "";
  }

  return (
    <div className={ cx(baseStyles.hFull, baseStyles.flexCol, baseStyles.transitionAll300) }>
      <header className={ cx(baseStyles.flexShrink0, baseStyles.transitionAll300, baseStyles.wFull, styles.appHeader, headerLeftGap) }>
        <SkAppHeader layout={layout} breadcrumb={showBreadcrumb} />
      </header>
      <div className={ cx(baseStyles.flexShrink0, baseStyles.overflowHidden, styles.appHeaderPlacement) }></div>
      {showTabbar && (<>
          <div className={ cx(baseStyles.flexShrink0, baseStyles.transitionAll300, baseStyles.wFull, styles.appTabBar, leftGap) }>
            <SkTabsBar />
          </div>
          <div className={ cx(baseStyles.flexShrink0, baseStyles.overflowHidden, styles.appTabBarPlacement) }></div>
        </>)
      }
      {sidebarVisible && <aside className={ cx(baseStyles.hFull, baseStyles.transitionAll300, styles.appSideBar, sidebarWidth, sidebarPadding) }>
        <SKSideBar showLogo={showLogo} collapse={collapse} />
      </aside>}
      <main className={ cx(baseStyles.flexCol, baseStyles.flexGrow, baseStyles.transitionAll300, baseStyles.overflowYAuto, styles.appMain, leftGap) }>
        <Outlet />
      </main>
      {showFooter && (<>
          <footer className={ cx(baseStyles.wFull, baseStyles.flexShrink0, baseStyles.transitionAll300, styles.appFooter, leftGap) }>
            <SkAppFooter />
          </footer>
          <div className={ cx(baseStyles.flexShrink0, baseStyles.overflowHidden, styles.appFooterPlacement) }></div>
        </>)
      }
      <SkMenu layout={layout} />
      <Suspense fallback={null}>
        <SkThemeDrawer />
      </Suspense>
    </div>
  )
}

const BaseLayoutProvider = () => {
  return (
    <MenuProvider>
      <BaseLayout />
    </MenuProvider>
  );
}

export default BaseLayoutProvider