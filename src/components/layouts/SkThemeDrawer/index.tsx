import { useAppStore } from "@/stores";
import { Divider, Drawer } from "antd";
import useBaseStyles from '@/assets/styles/base';
import useStyles from "./style";
import SkLayoutModeCards from "./components/SkLayoutModeCards";

const SkThemeDrawer: React.FC = () => {
  const { styles: baseStyles } = useBaseStyles();
  const { styles, cx } = useStyles();
  const { themeDrawerVisible, setThemeDrawerVisible } = useAppStore();

  const close = () => {
    setThemeDrawerVisible(false);
  }

  return (
    <Drawer title="主题配置" open={themeDrawerVisible} onClose={close} width={290}>
      <Divider style={{ borderColor: '#bfbfbf' }}>
        <span className={cx(baseStyles.flexCenter)}>
          <SvgIcon icon="tabler:layout" className={cx(styles.dividerIcon)} />
          布局样式
        </span>
      </Divider>
      <SkLayoutModeCards />
      <Divider style={{ borderColor: '#bfbfbf' }}>
        <span className={cx(baseStyles.flexCenter)}>
          <SvgIcon icon="famicons:color-palette-outline" className={cx(styles.dividerIcon)} />
          主题颜色
        </span>
      </Divider>
      <Divider style={{ borderColor: '#bfbfbf' }}>
        <span className={cx(baseStyles.flexCenter)}>
          <SvgIcon icon="ant-design:setting-outlined" className={cx(styles.dividerIcon)} />
          页面设置
        </span>
      </Divider>
    </Drawer>
  );
}

export default SkThemeDrawer