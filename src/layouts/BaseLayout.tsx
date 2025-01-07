import classnames from 'classnames';
import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";
import SkAppHeader from './components/SkAppHeader';
import SkTabsBar from "./components/SkTabsBar";
import SKSideBar from './components/SkSideBar';
import SkAppFooter from "./components/SkAppFooter";
import {
  Outlet,
} from 'react-router-dom';
import { useAppStore } from '@/stores';

const BaseLayout: React.FC = () => {
  const { styles: baseStyles } = useBaseStyles();
  const { styles } = useStyles();
  const { collapse } = useAppStore();
  const sidebarWidth = collapse ? styles.sidebarCollapseWidth : styles.sidebarWidth;
  const leftGap = collapse ? styles.leftGapCollapse : styles.leftGap;

  return (
    <div className={ classnames(baseStyles.hFull, baseStyles.flexCol, baseStyles.transitionAll300) }>
      <header className={ classnames(baseStyles.flexShrink0, baseStyles.transitionAll300, baseStyles.wFull, styles.appHeader, leftGap) }>
        <SkAppHeader />
      </header>
      <div className={ classnames(baseStyles.flexShrink0, baseStyles.overflowHidden, styles.appHeaderPlacement) }></div>
      <div className={ classnames(baseStyles.flexShrink0, baseStyles.transitionAll300, baseStyles.wFull, styles.appTabsBar, leftGap) }>
        <SkTabsBar />
      </div>
      <div className={ classnames(baseStyles.flexShrink0, baseStyles.overflowHidden, styles.appTabsBarPlacement) }></div>
      <aside className={ classnames(baseStyles.hFull, baseStyles.transitionAll300, styles.appSideBar, sidebarWidth) }>
        <SKSideBar />
      </aside>
      <main className={ classnames(baseStyles.flexCol, baseStyles.flexGrow, baseStyles.transitionAll300, baseStyles.overflowYAuto, styles.appMain, leftGap) }>
        <Outlet />
      </main>
      <footer className={ classnames(baseStyles.flexShrink0, baseStyles.transitionAll300, styles.appFooter, leftGap) }>
        <SkAppFooter />
      </footer>
      {/* <div className={ classnames(baseStyles.flexShrink0, baseStyles.overflowHidden, styles.appFooterPlacement) }></div> */}
    </div>
  )
}

export default BaseLayout