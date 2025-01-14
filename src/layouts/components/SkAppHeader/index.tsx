import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";
import SkCollapse from '@/components/layouts/SkCollapse';
import SkAvatar from '@/components/layouts/SkAvatar';
import SkThemeButton from '@/components/layouts/SkThemeButton';
import SkThemeModeToggle from '@/components/layouts/SkThemeModeToggle';
import { APP_HEADER_MENU_ID } from '@/const/app';
import SkBreadcrumb from '@/components/layouts/SkBreadcrumb';

const SkAppHeader: React.FC = () => {
  const { styles: baseStyles } = useBaseStyles()
  const { styles, cx } = useStyles()
  return (
    <SkDarkWrapper className={cx(baseStyles.hFull, baseStyles.flexYCenter, styles.appHeader)}>
      <SkCollapse />
      <div id={APP_HEADER_MENU_ID} className={ cx(baseStyles.hFull, baseStyles.flexYCenter, baseStyles.flex1Hidden) }>
        <SkBreadcrumb />
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