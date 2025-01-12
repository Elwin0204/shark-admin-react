
import { Tooltip } from 'antd';
import useStyles from "./style";
import useThemeStore from '@/stores/modules/theme';

const SkLayoutModeCards: React.FC = () => {
  const { styles, cx } = useStyles();
  const { layout, setLayout } = useThemeStore();

  return (
    <div className={cx(styles.layoutCards)}>
      <Tooltip title="左侧模式" placement='bottom'>
        <div className={cx(styles.layoutCard, styles.layoutCardMb, styles.layoutLeft, layout === "vertical" ? "is-active" : "")} onClick={() => setLayout("vertical")}>
          <div className={cx("card-dark", styles.layoutDark)}></div>
          <div className={cx(styles.layoutContainer)}>
            <div className={cx("card-light", styles.layoutLight)}></div>
            <div className={cx("card-content", styles.layoutContent)}></div>
          </div>
        </div>
      </Tooltip>
      <Tooltip title="顶部模式" placement='bottom'>
        <div className={cx(styles.layoutCard, styles.layoutCardMb, styles.layoutTop, layout === "horizontal" ? "is-active" : "")} onClick={() => setLayout("horizontal")}>
          <div className={cx("card-dark", styles.layoutDarkInTop)}></div>
          <div className={cx("card-content", styles.layoutContent)}></div>
        </div>
      </Tooltip>
      <Tooltip title="混合模式" placement='bottom'>
        <div className={cx(styles.layoutCard, styles.layoutCardMb, styles.layoutMix, layout === "horizontal-mix" ? "is-active" : "")} onClick={() => setLayout("horizontal-mix")}>
          <div className={cx("card-dark", styles.layoutDarkInMix)}></div>
          <div className={cx(styles.layoutContainerInMix)}>
            <div className={cx("card-light", styles.layoutLightInMix)}></div>
            <div className={cx("card-content", styles.layoutContentInMix)}></div>
          </div>
        </div>
      </Tooltip>
      <Tooltip title="左側混合" placement='bottom'>
        <div className={cx(styles.layoutCard, styles.layoutCardMb, styles.layoutLeftmix, layout === "vertical-mix" ? "is-active" : "")} onClick={() => setLayout("vertical-mix")}>
          <div className={cx("card-dark", styles.layoutDarkInLeft)}></div>
          <div className={cx("card-light", styles.layoutLightInLeftmix)}></div>
          <div className={cx("card-content", styles.layoutContentInLeftmix)}></div>
        </div>
      </Tooltip>
    </div>
  );
}

export default SkLayoutModeCards;