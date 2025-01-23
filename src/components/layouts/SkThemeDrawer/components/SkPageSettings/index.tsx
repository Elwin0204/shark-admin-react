import useBaseStyle from "@/assets/styles/base";
import { Switch } from "antd";
import { useThemeStore } from "@/stores";
import SkSettingItem from "@/components/ui/SkSettingItem";

const SkPageSettings = () => {
  const { styles: baseStyles, cx } = useBaseStyle();
  const { showWatermark, setShowWatermark, showBreadcrumb, setShowBreadcrumb, breadcrumbIcon, setBreadcrumbIcon, showTabbar, setShowTabbar, tabbarIcon, setTabbarIcon, showFooter, setShowFooter } = useThemeStore();
  return (
    <div className={cx(baseStyles.relative, baseStyles.flexColStretch, baseStyles.settingItem)}>
      <SkSettingItem
        label="水印"
      >
        <Switch defaultChecked={showWatermark} onChange={(value) => setShowWatermark(value)} />
      </SkSettingItem>
      <SkSettingItem
        label="面包屑"
      >
        <Switch defaultChecked={showBreadcrumb} onChange={(value) => setShowBreadcrumb(value)} />
      </SkSettingItem>
      <SkSettingItem
        label="面包屑图标"
      >
        <Switch defaultChecked={breadcrumbIcon} onChange={(value) => setBreadcrumbIcon(value)} />
      </SkSettingItem>
      <SkSettingItem
        label="标签栏"
      >
        <Switch defaultChecked={showTabbar} onChange={(value) => setShowTabbar(value)} />
      </SkSettingItem>
      <SkSettingItem
        label="标签栏图标"
      >
        <Switch defaultChecked={tabbarIcon} onChange={(value) => setTabbarIcon(value)} />
      </SkSettingItem>
      <SkSettingItem
        label="页脚"
      >
        <Switch defaultChecked={showFooter} onChange={(value) => setShowFooter(value)} />
      </SkSettingItem>
    </div>
  );
};

export default SkPageSettings;