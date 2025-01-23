import useBaseStyle from "@/assets/styles/base";
import { Switch } from "antd";
import { useThemeStore } from "@/stores";
import SkSettingItem from "@/components/ui/SkSettingItem";
import SkColorPicker from "@/components/layouts/SkColorPicker";
import SkThemeModeSegment from "@/components/layouts/SkThemeModeSegment";

const SkThemeColor = () => {
  const { styles: baseStyles, cx } = useBaseStyle();
  const { recommendColor, setRecommendColor, primaryColor, setPrimaryColor, themeMode, setThemeMode, grayscale, setGrayscale, colorBlindnessMode, setColorBlindnessMode } = useThemeStore();
  return (
    <div className={cx(baseStyles.relative, baseStyles.flexColStretch, baseStyles.settingItem)}>
      <SkSettingItem
        label="颜色推荐算法"
      >
        <Switch defaultChecked={recommendColor} onChange={(value) => setRecommendColor(value)} />
      </SkSettingItem>
      <SkSettingItem
        label="全局主色"
      >
        <SkColorPicker defaultValue={primaryColor} onChange={(value) => setPrimaryColor(value)} />
      </SkSettingItem>
      <SkSettingItem
        label="主题模式"
      >
        <SkThemeModeSegment defaultValue={themeMode} onChange={(value) => setThemeMode(value as UnionKey.ThemeMode) } />
      </SkSettingItem>
      <SkSettingItem
        label="灰色模式"
      >
        <Switch defaultChecked={grayscale} onChange={(value) => setGrayscale(value)} />
      </SkSettingItem>
      <SkSettingItem
        label="色弱模式"
      >
        <Switch defaultChecked={colorBlindnessMode} onChange={(value) => setColorBlindnessMode(value)} />
      </SkSettingItem>
    </div>
  );
};

export default SkThemeColor;