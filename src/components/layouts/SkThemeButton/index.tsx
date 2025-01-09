import SkButton from "@/components/ui/SkButton";
import SvgIcon from "@/components/ui/SvgIcon";
import useStyles from "./style";
import { useAppStore } from "@/stores";

const SkThemeButton: React.FC = () => {
  const { styles, cx } = useStyles();
  const { setThemeDrawerVisible } = useAppStore();
  return (
    <SkButton
      tooltipTitle="主题配置"
      onClick={ () => setThemeDrawerVisible(true)}
      buttonClass={cx(styles.skThemeButton)}
    >
      <SvgIcon icon="icon-park-outline:theme" />
    </SkButton>
  );
}

export default SkThemeButton;