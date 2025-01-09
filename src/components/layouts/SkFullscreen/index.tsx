import SkButton from "@/components/ui/SkButton";
import SvgIcon from "@/components/ui/SvgIcon";
import useStyles from "./style";

const SkFullscreen: React.FC = () => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);
  const { styles, cx } = useStyles();
  return (
    <SkButton
      tooltipTitle={isFullscreen ? "退出全屏" : "全屏"}
      onClick={toggleFullscreen}
      buttonClass={cx(styles.skFullscreen)}
    >
      {isFullscreen ? <SvgIcon icon="ant-design:fullscreen-exit-outlined" /> : <SvgIcon icon="ant-design:fullscreen-outlined" />}
    </SkButton>
  );
}

export default SkFullscreen;