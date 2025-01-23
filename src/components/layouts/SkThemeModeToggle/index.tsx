import { useThemeStore } from "@/stores";
import useStyles from "./style";
import { THEME_MODE_RECORDS } from "@/const/app";

const SkThemeModeToggle: React.FC = () => {
  const { styles, cx } = useStyles();
  const { themeMode, setThemeMode } = useThemeStore();
  return (
    <SkButton
      tooltipTitle="主题模式"
      onClick={ () => setThemeMode() }
      buttonClass={cx(styles.skDarkModeButton)}
    >
      <SvgIcon icon={THEME_MODE_RECORDS[themeMode]} />
    </SkButton>
  );
};

export default SkThemeModeToggle;