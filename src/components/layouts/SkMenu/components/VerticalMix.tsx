import { APP_SIDER_MENU_ID } from "@/const/app";
import { useAppStore, useThemeStore } from "@/stores";
import { createPortal } from "react-dom";
import useBaseStyles from '@/assets/styles/base';
import useStyles from "../style";

const VerticalMixContent: React.FC = () => {
  const { styles: baseStyles, cx } = useBaseStyles();
  const { styles } = useStyles();
  const { childLevelMenus } = useMixMenuContext();
  const { isDarkMode, inverted } = useThemeStore();
  const { mixSidebarFixed, toggleMixSidebarFixed } = useAppStore();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const mixInverted = !isDarkMode && inverted;
  const hasChild = childLevelMenus && childLevelMenus.length > 0;
  const showDrawer = hasChild && (drawerVisible || mixSidebarFixed);

  function handleMouseLeave() {
    setDrawerVisible(false);
  }

  function handleMixMenuSelect() {
    setDrawerVisible(true);
  }

  return (
    <div className={cx(baseStyles.hFull, baseStyles.flex)} onMouseLeave={handleMouseLeave}>
      <FirstLevelMenu inverted={mixInverted} onSelect={handleMixMenuSelect}>
        <SkLogo showTitle={false} className={cx(styles.verticalMixLogo)}  />
      </FirstLevelMenu>
      <div className={cx(baseStyles.relative, baseStyles.hFull, baseStyles.transitionAll300, mixSidebarFixed && hasChild ? styles.verticalMixChild : styles.verticalMixChildZero)}>
        <SkDarkWrapper className={cx(baseStyles.hFull, baseStyles.flexColStretch, baseStyles.nowrapHidden, baseStyles.transitionAll300, styles.verticalMixDarkWrapper, showDrawer ? styles.verticalMixChild : styles.verticalMixChildZero)}>
          <header className={cx(baseStyles.flexYCenter, baseStyles.justifyBetween, styles.verticalMixHeader)}>
            <h2 className={cx(styles.verticalMixHeaderTitle)}>shark-admin-react</h2>
            <SkPin className={cx()} onClick={ toggleMixSidebarFixed } pin={mixSidebarFixed} />
          </header>
          <VerticalMenu />
        </SkDarkWrapper>
      </div>
    </div>
  );
}

const VerticalMix: React.FC = () => {
  const container = useGetElementById(APP_SIDER_MENU_ID);

  if(!container) return null;

  return createPortal(<VerticalMixContent />, container);
}

export default VerticalMix;