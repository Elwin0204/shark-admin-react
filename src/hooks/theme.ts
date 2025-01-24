import { CONSOLE_INFO } from "@/const/app";
import { useThemeStore } from "@/stores";
import { addColorAlpha } from "@/utils/color";
import { ConfigProviderProps, theme } from "antd";

function useSharkTheme() {
  const { 
    primaryColor,
    darkMode,
    baseHeaderZindex,
    baseTabbarZindex,
    baseSideBarZindex,
    baseFooterZindex,
    baseHeaderHeight,
    baseFooterHeight,
    baseTabsBarHeight,
    baseSidebarWidth,
    baseSidebarCollapseWidth,
    baseSidebarMixWidth,
    baseSidebarMixChildWidth,
    baseSidebarVerticalMixWidth,
    baseMainPadding,
    showWatermark,
    watermarkText
  } = useThemeStore();
  const { darkAlgorithm, defaultAlgorithm } = theme;
  
  const antdTheme: ConfigProviderProps["theme"] = {
    token: {
      colorPrimary: primaryColor
    },
    algorithm: [darkMode ? darkAlgorithm : defaultAlgorithm],
  };

  const customToken = {
    primaryColor,
    darkMode,
    baseHeaderZindex,
    baseTabbarZindex,
    baseSideBarZindex,
    baseFooterZindex,
    baseHeaderHeight,
    baseFooterHeight,
    baseTabsBarHeight,
    baseSidebarWidth,
    baseSidebarCollapseWidth,
    baseSidebarMixWidth,
    baseSidebarMixChildWidth,
    baseSidebarVerticalMixWidth,
    baseMainPadding
  };

  const watermark = {
    visible: showWatermark,
    text: watermarkText
  };
  const primaryColorAlpha = addColorAlpha(primaryColor, 0.5);
  console.info(`%c${CONSOLE_INFO}`, `color:${primaryColor};font-weight:bold;font-size:6em;padding:10px 30px;text-shadow:0.7px -1px 0 rgb(255 255 255 / 100%),1.4px -2px 0 rgb(255 255 255 / 96%),2.0999999999999996px -3px 0 rgb(255 255 255 / 92%),2.8px -4px 0 rgb(255 255 255 / 88%),-1px 1px 2px rgb(0 0 0 / 70%),-2px 2px 4px rgb(0 0 0 / 70%),-3px 3px 6px rgb(0 0 0 / 70%);background: linear-gradient(to right top,${primaryColor}, ${primaryColorAlpha});`);

  return { antdTheme, customToken, watermark };
}

export default useSharkTheme;