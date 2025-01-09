import { useThemeStore } from "@/stores";
import useStyles from "./style";

const icons: Record<UnionKey.ThemeMode, string> = {
  light: 'akar-icons:sun',
  dark: 'solar:moon-sleep-outline',
  auto: 'material-symbols:brightness-auto-outline-rounded'
};

const SkThemeModeToggle: React.FC = () => {
  const { styles, cx } = useStyles();
  const { themeMode, toggleThemeMode } = useThemeStore();
  return (
    <SkButton
      tooltipTitle="主题模式"
      onClick={ () => toggleThemeMode() }
      buttonClass={cx(styles.skDarkModeButton)}
    >
      <SvgIcon icon={icons[themeMode]} />
    </SkButton>
  );
};

export default SkThemeModeToggle;