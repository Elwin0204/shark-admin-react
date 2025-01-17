import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";
import SkCollapse from '@/components/layouts/SkCollapse';
import SkAvatar from '@/components/layouts/SkAvatar';
import SkThemeButton from '@/components/layouts/SkThemeButton';
import SkThemeModeToggle from '@/components/layouts/SkThemeModeToggle';
import { APP_HEADER_MENU_ID } from '@/const/app';
import SkBreadcrumb from '@/components/layouts/SkBreadcrumb';

const HeaderPropsMap = new Map<UnionKey.LayoutMode, App.HeaderProps>([
  [
    "vertical",
    {
      logoVisible: false,
      collapseVisible: true,
      breadcrumbVisible: true,
    }
  ],
  [
    "horizontal",
    {
      logoVisible: true,
      collapseVisible: false,
      breadcrumbVisible: false,
    }
  ],
  [
    "vertical-mix",
    {
      logoVisible: true,
      collapseVisible: true,
      breadcrumbVisible: true,
    }
  ],
  [
    "horizontal-mix",
    {
      logoVisible: true,
      collapseVisible: false,
      breadcrumbVisible: false,
    }
  ],
]);

interface Props {
  layout: UnionKey.LayoutMode;
}

const SkAppHeader: React.FC<Props> = ({ layout }) => {
  const { styles: baseStyles } = useBaseStyles();
  const { styles, cx } = useStyles();
  const { logoVisible, collapseVisible, breadcrumbVisible } = HeaderPropsMap.get(layout) as App.HeaderProps;
  return (
    <SkDarkWrapper className={cx(baseStyles.hFull, baseStyles.flexYCenter, styles.appHeader)}>
      { logoVisible && <SkLogo showTitle={true} className={cx(styles.logoWidth)} /> }
      { collapseVisible && <SkCollapse /> }
      <div id={APP_HEADER_MENU_ID} className={ cx(baseStyles.hFull, baseStyles.flexYCenter, baseStyles.flex1Hidden) }>
        { breadcrumbVisible && <SkBreadcrumb /> }
      </div>
      <div className={ cx(baseStyles.hFull, baseStyles.flexYCenter, baseStyles.justifyEnd) }>
        <SkThemeButton />
        <SkThemeModeToggle />
        <SkFullscreen />
        <SkAvatar />
      </div>
    </SkDarkWrapper>
  )
}

export default SkAppHeader